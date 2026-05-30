// Edge function to send contact form emails via Resend
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Simple in-memory rate limiter (per cold-start instance)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: any): string | null {
  if (!body || typeof body !== "object") return "Invalid payload";
  if (body.website) return "Spam detected"; // honeypot
  const { name, email, subject, message } = body;
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100)
    return "Invalid name";
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 255)
    return "Invalid email";
  if (typeof subject !== "string" || subject.trim().length < 2 || subject.length > 200)
    return "Invalid subject";
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 5000)
    return "Invalid message";
  return null;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Prefer Cloudflare-injected IP (cannot be spoofed by client).
    // Fall back to x-forwarded-for only when cf-connecting-ip is absent.
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => null);
    const err = validate(body);
    if (err) {
      return new Response(JSON.stringify({ error: err }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL");
    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL");
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, subject, message } = body;
    const submittedAt = new Date().toISOString();
    const resend = new Resend(RESEND_API_KEY);

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
        <h2 style="margin:0 0 16px;font-size:20px">New Portfolio Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:120px">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#666">Subject</td><td>${escapeHtml(subject)}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Submitted</td><td>${escapeHtml(submittedAt)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
        <h3 style="margin:0 0 8px;font-size:15px">Message</h3>
        <p style="white-space:pre-wrap;line-height:1.55;font-size:14px;margin:0">${escapeHtml(message)}</p>
      </div>
    `;

    const text = `New Portfolio Inquiry

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted At:
${submittedAt}`;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New Portfolio Inquiry: ${subject}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-contact-email error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

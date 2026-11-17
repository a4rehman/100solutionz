import { NextRequest, NextResponse } from "next/server";

interface InquiryPayload {
  fullName: string;
  email: string;
  companyName: string;
  country: string;
  industry: string;
  selectedSolution: string;
  description: string;
  budget: string;
  contactMethod: string;
  honeypot?: string; // Spam trap
}

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodic cleanup
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function sanitize(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "") // strip angle brackets
    .trim()
    .slice(0, 2000); // hard cap length
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body: InquiryPayload = await req.json();

    // Honeypot check for bots
    if (body.honeypot && body.honeypot.trim().length > 0) {
      // Silently accept bots without doing work
      return NextResponse.json({ success: true, message: "Inquiry received." }, { status: 200 });
    }

    const fullName = sanitize(body.fullName);
    const email = sanitize(body.email);
    const companyName = sanitize(body.companyName);
    const country = sanitize(body.country);
    const industry = sanitize(body.industry);
    const selectedSolution = sanitize(body.selectedSolution);
    const description = sanitize(body.description);
    const budget = sanitize(body.budget);
    const contactMethod = sanitize(body.contactMethod);

    // Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Please provide a valid full name." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid business email." }, { status: 400 });
    }

    if (!description || description.length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of your project or workflow goals (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const leadRecord = {
      timestamp: new Date().toISOString(),
      leadSource: "AI Solutions Inquiry Form",
      fullName,
      email,
      companyName: companyName || "Not specified",
      country: country || "Not specified",
      industry: industry || "General Business",
      selectedSolution: selectedSolution || "General AI Solution",
      budget: budget || "Not sure yet",
      preferredContactMethod: contactMethod || "Email",
      projectScope: description,
      ipAddress: ip,
    };

    // CRM / Webhook integration adapter
    // If user configured CRM_WEBHOOK_URL or CRM_API_KEY in environment
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    let crmDelivered = false;

    if (crmWebhookUrl) {
      try {
        const crmRes = await fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.CRM_API_KEY ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` } : {}),
          },
          body: JSON.stringify(leadRecord),
        });
        if (crmRes.ok) {
          crmDelivered = true;
        }
      } catch (crmErr) {
        console.warn("CRM Webhook dispatch failed:", crmErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully received by our AI engineering team.",
        crmStatus: crmDelivered ? "connected" : "queued",
        referenceId: `100S-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

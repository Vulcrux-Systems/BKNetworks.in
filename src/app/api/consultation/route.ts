import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = {
    access_key: process.env.WEB3FORMS_ACCESS_KEY,
    subject: `Consultation Request — ${body.name || "Website Visitor"} | ${body.date || ""} ${body.time || ""}`,
    from_name: "BKNetwork Website",
    replyto: body.email,
    name: body.name,
    email: body.email,
    phone: body.phone || "Not provided",
    service: body.service || "Not specified",
    preferred_date: body.date || "Not specified",
    preferred_time: body.time || "Not specified",
    message: body.message || "No additional message",
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json({ error: data.message || "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

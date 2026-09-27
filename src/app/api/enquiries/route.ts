import { NextRequest, NextResponse } from "next/server";
import { createEnquiry } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, quantity, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      service: service || "General Calendar Pasting",
      quantity: quantity ? quantity.trim() : undefined,
      message: message ? message.trim() : undefined,
      status: "new",
    });

    return NextResponse.json({
      success: true,
      enquiryNumber: enquiry.enquiryNumber,
      message: "Thank you! Your quote inquiry has been submitted. Our team will contact you shortly.",
      enquiry,
    });
  } catch (error) {
    console.error("Public Enquiry Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getEnquiries, createEnquiry } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();

    let enquiries = await getEnquiries();

    if (status && status !== "all") {
      enquiries = enquiries.filter((e) => e.status === status);
    }

    if (search) {
      enquiries = enquiries.filter(
        (e) =>
          e.name.toLowerCase().includes(search) ||
          e.phone.includes(search) ||
          (e.email && e.email.toLowerCase().includes(search)) ||
          e.enquiryNumber.toLowerCase().includes(search) ||
          e.service.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("Enquiries GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, email, service, quantity, message, status, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const enquiry = await createEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      service: service || "Calendar Pasting & Tinning",
      quantity: quantity ? quantity.trim() : undefined,
      message: message ? message.trim() : undefined,
      status: status || "new",
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry created successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Enquiry POST Error:", error);
    return NextResponse.json({ error: "Failed to create enquiry." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getEnquiryById, updateEnquiry, deleteEnquiry } from "@/lib/db";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const enquiry = await getEnquiryById(params.id);
    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("Enquiry GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiry." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateEnquiry(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry: updated,
    });
  } catch (error) {
    console.error("Enquiry PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update enquiry." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteEnquiry(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Enquiry not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Enquiry DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete enquiry." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getBusinessSettings, saveBusinessSettings } from "@/lib/db";
import { BusinessSettings } from "@/lib/db/types";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const settings = await getBusinessSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Settings GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body: BusinessSettings = await req.json();
    const updated = await saveBusinessSettings(body);

    return NextResponse.json({
      success: true,
      message: "Business settings saved successfully.",
      settings: updated,
    });
  } catch (error) {
    console.error("Settings PUT Error:", error);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}

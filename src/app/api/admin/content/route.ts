import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getWebsiteContent, saveWebsiteContent } from "@/lib/db";
import { WebsiteContent } from "@/lib/db/types";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const content = await getWebsiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Website Content GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch website content." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body: WebsiteContent = await req.json();
    const updated = await saveWebsiteContent(body);

    return NextResponse.json({
      success: true,
      message: "Website content updated successfully.",
      content: updated,
    });
  } catch (error) {
    console.error("Website Content PUT Error:", error);
    return NextResponse.json({ error: "Failed to update website content." }, { status: 500 });
  }
}

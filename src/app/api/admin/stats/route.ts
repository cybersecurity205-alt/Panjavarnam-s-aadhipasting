import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getDashboardStats } from "@/lib/db";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const stats = await getDashboardStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Admin Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve dashboard metrics." },
      { status: 500 }
    );
  }
}

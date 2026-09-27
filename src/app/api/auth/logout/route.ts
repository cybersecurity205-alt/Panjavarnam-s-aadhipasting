import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/db";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("aadhi_admin_session")?.value;

    if (token) {
      await deleteSession(token);
    }
    clearSessionCookie();

    return NextResponse.json({
      success: true,
      message: "Successfully logged out.",
    });
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { error: "Error during logout." },
      { status: 500 }
    );
  }
}

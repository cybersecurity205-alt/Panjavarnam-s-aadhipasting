import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { authenticated: false, error: "Unauthorized session." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error("Auth Me API Error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal session error." },
      { status: 500 }
    );
  }
}

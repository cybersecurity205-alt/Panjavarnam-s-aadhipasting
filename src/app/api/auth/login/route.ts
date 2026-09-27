import { NextRequest, NextResponse } from "next/server";
import { getAdminUserByEmail } from "@/lib/db";
import { verifyPassword, createAdminSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await getAdminUserByEmail(email.trim());
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.passwordHash, admin.passwordSalt);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // Create session & set HTTP-only cookie
    const session = await createAdminSession(admin);
    setSessionCookie(session.token);

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      message: "Admin authentication successful.",
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}

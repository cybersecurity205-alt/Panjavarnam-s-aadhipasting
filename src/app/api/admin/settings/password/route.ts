import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin, verifyPassword, hashPassword } from "@/lib/auth";
import { saveAdminUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    const isMatch = verifyPassword(currentPassword, admin.passwordHash, admin.passwordSalt);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect current password." },
        { status: 400 }
      );
    }

    const { salt, hash } = hashPassword(newPassword);
    const updatedAdmin = {
      ...admin,
      passwordHash: hash,
      passwordSalt: salt,
    };

    await saveAdminUser(updatedAdmin);

    return NextResponse.json({
      success: true,
      message: "Admin password successfully updated.",
    });
  } catch (error) {
    console.error("Change Password API Error:", error);
    return NextResponse.json(
      { error: "Failed to update password." },
      { status: 500 }
    );
  }
}

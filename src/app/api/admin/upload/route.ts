import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Basic file validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed." },
        { status: 400 }
      );
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const originalName = file.name || "image.jpg";
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const safeFilename = `${baseName}-${Date.now()}${ext}`;
    const destinationPath = path.join(uploadsDir, safeFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.promises.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
    });
  } catch (error) {
    console.error("Admin File Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload image file." },
      { status: 500 }
    );
  }
}

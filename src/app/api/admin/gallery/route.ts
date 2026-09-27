import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getGalleryItems, saveGalleryItem } from "@/lib/db";
import { GalleryItemRecord } from "@/lib/db/types";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const items = await getGalleryItems();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Gallery GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { title, category, description, image, alt, caliperOrSize, displayOrder, isPublished } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image URL are required." }, { status: 400 });
    }

    const gallery = await getGalleryItems();
    const newItem: GalleryItemRecord = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category: category || "Calendar Pasting",
      description: description || "",
      image,
      alt: alt || title.trim(),
      caliperOrSize: caliperOrSize || "",
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : gallery.length + 1,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveGalleryItem(newItem);

    return NextResponse.json({
      success: true,
      message: "Gallery item added successfully.",
      item: newItem,
    });
  } catch (error) {
    console.error("Gallery POST Error:", error);
    return NextResponse.json({ error: "Failed to add gallery item." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from "@/lib/db";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const items = await getGalleryItems();
    const item = items.find((g) => g.id === params.id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Gallery GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery item." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const items = await getGalleryItems();
    const existing = items.find((g) => g.id === params.id);
    if (!existing) {
      return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    }

    const body = await req.json();
    const updated = {
      ...existing,
      ...body,
      id: params.id,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : existing.displayOrder,
      updatedAt: new Date().toISOString(),
    };

    await saveGalleryItem(updated);

    return NextResponse.json({
      success: true,
      message: "Gallery item updated successfully.",
      item: updated,
    });
  } catch (error) {
    console.error("Gallery PUT Error:", error);
    return NextResponse.json({ error: "Failed to update gallery item." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteGalleryItem(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Gallery item not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error("Gallery DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item." }, { status: 500 });
  }
}

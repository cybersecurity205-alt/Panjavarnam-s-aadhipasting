import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getCategoryById, saveCategory, deleteCategory } from "@/lib/db";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const category = await getCategoryById(params.id);
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Category GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch category." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const existing = await getCategoryById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    const body = await req.json();
    const updated = {
      ...existing,
      ...body,
      id: params.id,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : existing.displayOrder,
      updatedAt: new Date().toISOString(),
    };

    await saveCategory(updated);

    return NextResponse.json({
      success: true,
      message: "Category updated successfully.",
      category: updated,
    });
  } catch (error) {
    console.error("Category PUT Error:", error);
    return NextResponse.json({ error: "Failed to update category." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteCategory(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Category not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Category DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}

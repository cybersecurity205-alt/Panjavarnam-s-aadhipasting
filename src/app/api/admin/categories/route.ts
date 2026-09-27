import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getCategories, saveCategory } from "@/lib/db";
import { Category } from "@/lib/db/types";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const categories = await getCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Categories GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { name, tag, description, image, displayOrder, isActive } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const categories = await getCategories();
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newCategory: Category = {
      id: `cat-${slug}-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      slug,
      tag: tag || "Artisanal",
      description: description || "",
      image: image || "/images/blush/cat-wall-calendar.jpg",
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : categories.length + 1,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveCategory(newCategory);

    return NextResponse.json({
      success: true,
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Category POST Error:", error);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}

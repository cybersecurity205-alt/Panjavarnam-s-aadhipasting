import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getProductById, saveProduct, deleteProduct, getCategories } from "@/lib/db";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const product = await getProductById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const existing = await getProductById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const body = await req.json();
    let categoryName = existing.categoryName;
    if (body.categoryId && body.categoryId !== existing.categoryId) {
      const categories = await getCategories();
      const cat = categories.find((c) => c.id === body.categoryId);
      if (cat) categoryName = cat.name;
    }

    const updated = {
      ...existing,
      ...body,
      id: params.id,
      categoryName,
      price: body.price !== undefined ? Number(body.price) : existing.price,
      salePrice: body.salePrice !== undefined ? (body.salePrice === null ? undefined : Number(body.salePrice)) : existing.salePrice,
      stock: body.stock !== undefined ? Number(body.stock) : existing.stock,
      updatedAt: new Date().toISOString(),
    };

    await saveProduct(updated);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product: updated,
    });
  } catch (error) {
    console.error("Product PUT Error:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteProduct(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Product DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}

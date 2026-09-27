import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getProducts, saveProduct, getCategories } from "@/lib/db";
import { Product } from "@/lib/db/types";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase();
    const categoryId = searchParams.get("categoryId");

    let products = await getProducts();

    if (categoryId && categoryId !== "all") {
      products = products.filter((p) => p.categoryId === categoryId);
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Products GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      sku,
      categoryId,
      description,
      shortDescription,
      price,
      salePrice,
      stock,
      availability,
      isFeatured,
      isActive,
      image,
      images,
      specs,
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Name, price, and category are required fields." },
        { status: 400 }
      );
    }

    const categories = await getCategories();
    const category = categories.find((c) => c.id === categoryId);
    const categoryName = category ? category.name : "Custom";

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug,
      sku: sku ? sku.trim() : `AP-${Date.now().toString().slice(-4)}`,
      categoryId,
      categoryName,
      description: description || "",
      shortDescription: shortDescription || "",
      price: Number(price) || 0,
      salePrice: salePrice ? Number(salePrice) : undefined,
      stock: stock !== undefined ? Number(stock) : 100,
      availability: availability || "in_stock",
      isFeatured: Boolean(isFeatured),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      image: image || "/images/blush/cat-wall-calendar.jpg",
      images: Array.isArray(images) && images.length > 0 ? images : [image || "/images/blush/cat-wall-calendar.jpg"],
      specs: Array.isArray(specs) ? specs : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveProduct(newProduct);

    return NextResponse.json({
      success: true,
      message: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Products POST Error:", error);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}

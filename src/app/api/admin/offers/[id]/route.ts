import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getOfferById, saveOffer, deleteOffer } from "@/lib/db";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const offer = await getOfferById(params.id);
    if (!offer) {
      return NextResponse.json({ error: "Offer not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error("Offer GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch offer." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const existing = await getOfferById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Offer not found." }, { status: 404 });
    }

    const body = await req.json();
    const updated = {
      ...existing,
      ...body,
      id: params.id,
      discountPercentage: body.discountPercentage !== undefined ? Number(body.discountPercentage) : existing.discountPercentage,
      updatedAt: new Date().toISOString(),
    };

    await saveOffer(updated);

    return NextResponse.json({
      success: true,
      message: "Offer updated successfully.",
      offer: updated,
    });
  } catch (error) {
    console.error("Offer PUT Error:", error);
    return NextResponse.json({ error: "Failed to update offer." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteOffer(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Offer not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Offer deleted successfully.",
    });
  } catch (error) {
    console.error("Offer DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete offer." }, { status: 500 });
  }
}

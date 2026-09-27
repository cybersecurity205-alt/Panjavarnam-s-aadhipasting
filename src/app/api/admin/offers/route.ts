import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getOffers, saveOffer } from "@/lib/db";
import { Offer } from "@/lib/db/types";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const offers = await getOffers();
    return NextResponse.json({ success: true, offers });
  } catch (error) {
    console.error("Offers GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch offers." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, bannerImage, discountPercentage, discountCode, startDate, endDate, destinationUrl, isActive } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Title, start date, and end date are required." },
        { status: 400 }
      );
    }

    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      title: title.trim(),
      description: description || "",
      bannerImage: bannerImage || "",
      discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
      discountCode: discountCode ? discountCode.trim().toUpperCase() : undefined,
      startDate,
      endDate,
      destinationUrl: destinationUrl || "/products",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveOffer(newOffer);

    return NextResponse.json({
      success: true,
      message: "Offer created successfully.",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Offer POST Error:", error);
    return NextResponse.json({ error: "Failed to create offer." }, { status: 500 });
  }
}

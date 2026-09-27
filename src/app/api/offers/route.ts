import { NextResponse } from "next/server";
import { getOffers } from "@/lib/db";

export async function GET() {
  try {
    const offers = await getOffers();
    const now = new Date();
    // Filter active and unexpired offers
    const activeOffers = offers.filter((o) => {
      if (!o.isActive) return false;
      const end = new Date(o.endDate);
      return isNaN(end.getTime()) || end >= now;
    });

    return NextResponse.json({
      success: true,
      offers: activeOffers,
    });
  } catch (error) {
    console.error("Public Offers API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch offers." },
      { status: 500 }
    );
  }
}

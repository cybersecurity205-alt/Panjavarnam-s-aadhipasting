import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders, getOrderById } from "@/lib/db";
import { OrderItem } from "@/lib/db/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      address,
      items,
      notes,
      orderType,
      city,
      pincode,
      gstin,
      companyName,
    } = body;

    // Validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item must be included in the order." },
        { status: 400 }
      );
    }

    // Format items
    const formattedItems: OrderItem[] = items.map((it: any) => ({
      productId: String(it.productId || it.id || "custom-product"),
      name: String(it.name || "Calendar Product"),
      sku: it.sku ? String(it.sku) : undefined,
      image: it.image ? String(it.image) : undefined,
      quantity: Math.max(1, Number(it.quantity) || 1),
      price: Number(it.price) || 0,
    }));

    // Calculate total amount
    const totalAmount = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Compile comprehensive delivery and commercial notes
    const combinedNotes = [
      orderType ? `Type: ${orderType}` : null,
      companyName ? `Company: ${companyName}` : null,
      gstin ? `GSTIN: ${gstin}` : null,
      city ? `Hub/City: ${city}` : null,
      pincode ? `Pincode: ${pincode}` : null,
      notes ? `Customer Note: ${notes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // Full Address string
    const fullAddress = [address, city, pincode ? `PIN: ${pincode}` : null]
      .filter(Boolean)
      .join(", ");

    const order = await createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      address: fullAddress || undefined,
      city: city ? String(city).trim() : undefined,
      pincode: pincode ? String(pincode).trim() : undefined,
      companyName: companyName ? String(companyName).trim() : undefined,
      gstin: gstin ? String(gstin).trim() : undefined,
      orderType: orderType || "Commercial Bulk Order",
      items: formattedItems,
      subtotal: totalAmount,
      totalAmount,
      status: "pending",
      paymentMethod: body.paymentMethod || "bank_transfer",
      paymentStatus: "pending",
      notes: combinedNotes || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.orderNumber,
        message:
          "Order / quotation request placed successfully! Our production coordinator will contact you shortly.",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Public Order Submission Error:", error);
    return NextResponse.json(
      { error: "Failed to place order. Please try again or contact us directly on WhatsApp." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber");
    const phone = searchParams.get("phone");

    if (!orderNumber) {
      return NextResponse.json(
        { error: "orderNumber parameter is required." },
        { status: 400 }
      );
    }

    const allOrders = await getOrders();
    const order = allOrders.find(
      (o) =>
        o.orderNumber.toLowerCase() === orderNumber.toLowerCase() &&
        (!phone || o.phone.replace(/[^0-9]/g, "").endsWith(phone.replace(/[^0-9]/g, "").slice(-6)))
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or details mismatch." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        status: order.status,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        itemsCount: order.items.length,
      },
    });
  } catch (error) {
    console.error("Public Order Lookup Error:", error);
    return NextResponse.json(
      { error: "Failed to look up order." },
      { status: 500 }
    );
  }
}

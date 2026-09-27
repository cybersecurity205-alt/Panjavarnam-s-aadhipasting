import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db";
import { Order } from "@/lib/db/types";

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order GET by ID Error:", error);
    return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();

    const allowedUpdates: Partial<Order> = {};

    // Customer fields
    if (body.customerName !== undefined) allowedUpdates.customerName = String(body.customerName).trim();
    if (body.phone !== undefined) allowedUpdates.phone = String(body.phone).trim();
    if (body.email !== undefined) allowedUpdates.email = body.email ? String(body.email).trim() : undefined;
    if (body.address !== undefined) allowedUpdates.address = body.address ? String(body.address).trim() : undefined;
    if (body.city !== undefined) allowedUpdates.city = body.city ? String(body.city).trim() : undefined;
    if (body.pincode !== undefined) allowedUpdates.pincode = body.pincode ? String(body.pincode).trim() : undefined;
    if (body.companyName !== undefined) allowedUpdates.companyName = body.companyName ? String(body.companyName).trim() : undefined;
    if (body.gstin !== undefined) allowedUpdates.gstin = body.gstin ? String(body.gstin).trim() : undefined;
    if (body.orderType !== undefined) allowedUpdates.orderType = body.orderType ? String(body.orderType).trim() : undefined;

    // Financial fields
    if (body.subtotal !== undefined) allowedUpdates.subtotal = Number(body.subtotal) || 0;
    if (body.discountAmount !== undefined) allowedUpdates.discountAmount = Math.max(0, Number(body.discountAmount) || 0);
    if (body.deliveryCharges !== undefined) allowedUpdates.deliveryCharges = Math.max(0, Number(body.deliveryCharges) || 0);
    if (body.totalAmount !== undefined) allowedUpdates.totalAmount = Math.max(0, Number(body.totalAmount) || 0);

    // Payment fields
    if (body.paymentMethod !== undefined) allowedUpdates.paymentMethod = String(body.paymentMethod).trim();
    if (body.paymentStatus !== undefined) allowedUpdates.paymentStatus = body.paymentStatus;
    if (body.paymentReference !== undefined) allowedUpdates.paymentReference = body.paymentReference ? String(body.paymentReference).trim() : undefined;

    // Order status & notes
    if (body.status !== undefined) allowedUpdates.status = body.status;
    if (body.notes !== undefined) allowedUpdates.notes = body.notes ? String(body.notes) : undefined;
    if (body.adminNotes !== undefined) allowedUpdates.adminNotes = body.adminNotes ? String(body.adminNotes) : undefined;

    // Logistics fields
    if (body.courierName !== undefined) allowedUpdates.courierName = body.courierName ? String(body.courierName).trim() : undefined;
    if (body.trackingId !== undefined) allowedUpdates.trackingId = body.trackingId ? String(body.trackingId).trim() : undefined;
    if (body.trackingUrl !== undefined) allowedUpdates.trackingUrl = body.trackingUrl ? String(body.trackingUrl).trim() : undefined;

    const updated = await updateOrder(params.id, allowedUpdates);

    if (!updated) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
      order: updated,
    });
  } catch (error) {
    console.error("Order PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const deleted = await deleteOrder(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Order not found or already deleted." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error("Order DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete order." }, { status: 500 });
  }
}

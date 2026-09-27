import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getOrders, createOrder } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");
    const paymentMethod = searchParams.get("paymentMethod");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let orders = await getOrders();

    // Status filter
    if (status && status !== "all") {
      orders = orders.filter(
        (o) => o.status === status || (status === "pending" && o.status === "pending_confirmation")
      );
    }

    // Payment status filter
    if (paymentStatus && paymentStatus !== "all") {
      orders = orders.filter((o) => o.paymentStatus === paymentStatus);
    }

    // Payment method filter
    if (paymentMethod && paymentMethod !== "all") {
      orders = orders.filter((o) => o.paymentMethod === paymentMethod);
    }

    // Date range filter
    if (dateFrom) {
      const fromTime = new Date(dateFrom).getTime();
      if (!isNaN(fromTime)) {
        orders = orders.filter((o) => new Date(o.createdAt).getTime() >= fromTime);
      }
    }

    if (dateTo) {
      const toDateObj = new Date(dateTo);
      if (dateTo.length <= 10) {
        toDateObj.setHours(23, 59, 59, 999);
      }
      const toTime = toDateObj.getTime();
      if (!isNaN(toTime)) {
        orders = orders.filter((o) => new Date(o.createdAt).getTime() <= toTime);
      }
    }

    // Search query
    if (search) {
      orders = orders.filter((o) => {
        const matchOrderNum = o.orderNumber?.toLowerCase().includes(search);
        const matchCustomer = o.customerName?.toLowerCase().includes(search);
        const matchPhone = o.phone?.includes(search);
        const matchEmail = o.email?.toLowerCase().includes(search);
        const matchProduct = o.items?.some((it) => it.name?.toLowerCase().includes(search));
        return matchOrderNum || matchCustomer || matchPhone || matchEmail || matchProduct;
      });
    }

    return NextResponse.json({ success: true, orders, total: orders.length });
  } catch (error) {
    console.error("Orders GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { customerName, phone, email, address, items, totalAmount, status, notes } = body;

    if (!customerName || !phone || !items || !items.length) {
      return NextResponse.json(
        { error: "Customer name, phone, and at least one line item are required." },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      address: address ? address.trim() : undefined,
      items,
      totalAmount: Number(totalAmount) || 0,
      status: status || "pending",
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      message: "Order recorded successfully.",
      order,
    });
  } catch (error) {
    console.error("Order POST Error:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}

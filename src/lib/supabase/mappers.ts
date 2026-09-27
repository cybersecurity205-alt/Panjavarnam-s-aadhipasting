import { Product, Order, OrderItem, OrderStatus, PaymentStatus } from "../db/types";

/**
 * Maps a public.products row (snake_case) from Supabase into the application Product type (camelCase).
 */
export function mapDbProductToProduct(row: any): Product {
  let images: string[] = [];
  if (Array.isArray(row.images)) {
    images = row.images;
  } else if (typeof row.images === "string") {
    try {
      images = JSON.parse(row.images);
    } catch {
      images = [row.images];
    }
  }

  let specs: string[] = [];
  if (Array.isArray(row.specs)) {
    specs = row.specs;
  } else if (typeof row.specs === "string") {
    try {
      specs = JSON.parse(row.specs);
    } catch {
      specs = [row.specs];
    }
  }

  return {
    id: String(row.id),
    name: String(row.name || ""),
    slug: String(row.slug || ""),
    sku: String(row.sku || ""),
    categoryId: String(row.category_id || ""),
    categoryName: String(row.category_name || ""),
    description: String(row.description || ""),
    shortDescription: row.short_description || undefined,
    price: Number(row.price) || 0,
    salePrice:
      row.sale_price !== null && row.sale_price !== undefined
        ? Number(row.sale_price)
        : undefined,
    stock:
      row.stock !== null && row.stock !== undefined
        ? Number(row.stock)
        : undefined,
    availability: row.availability || "in_stock",
    isFeatured: Boolean(row.is_featured),
    isActive: row.is_active !== undefined ? Boolean(row.is_active) : true,
    image: String(row.image || ""),
    images,
    specs,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

/**
 * Maps an application Product object (camelCase) to a public.products row (snake_case) for Supabase.
 */
export function mapProductToDbProduct(product: Product): Record<string, any> {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku || "",
    category_id: product.categoryId || "",
    category_name: product.categoryName || "",
    description: product.description || "",
    short_description: product.shortDescription || null,
    price: Number(product.price) || 0,
    sale_price:
      product.salePrice !== undefined && product.salePrice !== null
        ? Number(product.salePrice)
        : null,
    stock:
      product.stock !== undefined && product.stock !== null
        ? Number(product.stock)
        : null,
    availability: product.availability || "in_stock",
    is_featured: Boolean(product.isFeatured),
    is_active: product.isActive !== undefined ? Boolean(product.isActive) : true,
    image: product.image || "",
    images: product.images || [],
    specs: product.specs || [],
    created_at: product.createdAt || new Date().toISOString(),
    updated_at: product.updatedAt || new Date().toISOString(),
  };
}

/**
 * Maps a public.orders row + public.order_items rows to the application Order type.
 */
export function mapDbOrderToOrder(row: any, items: any[] = []): Order {
  const mappedItems: OrderItem[] = items.map((it: any) => {
    const qty = Math.max(1, Number(it.quantity) || 1);
    const unitPrice = Number(it.unit_price ?? it.price ?? 0);
    const lineTotal = Number(it.line_total ?? qty * unitPrice);

    return {
      id: it.id ? String(it.id) : undefined,
      productId: String(it.product_id || it.productId || "custom"),
      name: String(it.product_name || it.name || "Product"),
      sku: it.sku ? String(it.sku) : undefined,
      image: it.image ? String(it.image) : undefined,
      quantity: qty,
      price: unitPrice,
      lineTotal,
    };
  });

  const subtotal =
    row.subtotal !== null && row.subtotal !== undefined
      ? Number(row.subtotal)
      : mappedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return {
    id: String(row.id),
    orderNumber: String(row.order_number),
    customerName: String(row.customer_name || ""),
    phone: String(row.phone || ""),
    email: row.email ? String(row.email) : undefined,
    address: row.address ? String(row.address) : undefined,
    city: row.city ? String(row.city) : undefined,
    pincode: row.pincode ? String(row.pincode) : undefined,
    companyName: row.company_name ? String(row.company_name) : undefined,
    gstin: row.gstin ? String(row.gstin) : undefined,
    orderType: row.order_type || "Commercial Bulk Order",
    items: mappedItems,
    subtotal,
    discountAmount:
      row.discount_amount !== null && row.discount_amount !== undefined
        ? Number(row.discount_amount)
        : 0,
    deliveryCharges:
      row.delivery_charges !== null && row.delivery_charges !== undefined
        ? Number(row.delivery_charges)
        : 0,
    totalAmount: Number(row.total_amount) || 0,
    paymentMethod: row.payment_method || "bank_transfer",
    paymentStatus: (row.payment_status as PaymentStatus) || "pending",
    paymentReference: row.payment_reference ? String(row.payment_reference) : undefined,
    status: (row.status as OrderStatus) || "pending",
    courierName: row.courier_name ? String(row.courier_name) : undefined,
    trackingId: row.tracking_id ? String(row.tracking_id) : undefined,
    trackingUrl: row.tracking_url ? String(row.tracking_url) : undefined,
    notes: row.notes ? String(row.notes) : undefined,
    adminNotes: row.admin_notes ? String(row.admin_notes) : undefined,
    isArchived: Boolean(row.is_archived),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

/**
 * Maps an application Order object to a public.orders row for Supabase.
 */
export function mapOrderToDbOrder(order: Partial<Order>): Record<string, any> {
  return {
    id: order.id,
    order_number: order.orderNumber,
    customer_name: order.customerName,
    phone: order.phone,
    email: order.email || null,
    address: order.address || null,
    city: order.city || null,
    pincode: order.pincode || null,
    company_name: order.companyName || null,
    gstin: order.gstin || null,
    order_type: order.orderType || "Commercial Bulk Order",
    subtotal: order.subtotal !== undefined ? Number(order.subtotal) : Number(order.totalAmount || 0),
    discount_amount: order.discountAmount !== undefined ? Number(order.discountAmount) : 0,
    delivery_charges: order.deliveryCharges !== undefined ? Number(order.deliveryCharges) : 0,
    total_amount: Number(order.totalAmount || 0),
    payment_method: order.paymentMethod || "bank_transfer",
    payment_status: order.paymentStatus || "pending",
    payment_reference: order.paymentReference || null,
    status: order.status || "pending",
    courier_name: order.courierName || null,
    tracking_id: order.trackingId || null,
    tracking_url: order.trackingUrl || null,
    notes: order.notes || null,
    admin_notes: order.adminNotes || null,
    is_archived: Boolean(order.isArchived),
    created_at: order.createdAt || new Date().toISOString(),
    updated_at: order.updatedAt || new Date().toISOString(),
  };
}

/**
 * Maps an OrderItem to a public.order_items row for Supabase.
 */
export function mapItemToDbOrderItem(orderId: string, item: OrderItem): Record<string, any> {
  const qty = Math.max(1, Number(item.quantity) || 1);
  const unitPrice = Number(item.price) || 0;
  const lineTotal = Number(item.lineTotal ?? qty * unitPrice);

  const row: Record<string, any> = {
    order_id: orderId,
    product_id: item.productId,
    product_name: item.name,
    sku: item.sku || null,
    image: item.image || null,
    quantity: qty,
    unit_price: unitPrice,
    line_total: lineTotal,
    created_at: new Date().toISOString(),
  };

  if (item.id && !isNaN(Number(item.id))) {
    row.id = Number(item.id);
  }

  return row;
}

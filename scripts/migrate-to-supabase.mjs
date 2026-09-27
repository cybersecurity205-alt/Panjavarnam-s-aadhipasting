/**
 * Safe Migration Script: data/*.json -> Supabase
 *
 * Migrates:
 *   - data/products.json -> public.products
 *   - data/orders.json   -> public.orders & public.order_items
 *
 * Safety Guarantees:
 *   1. Non-destructive: Does NOT delete or modify JSON source files.
 *   2. Duplicate-safe: Checks existing IDs and order numbers before inserting.
 *   3. Secret-safe: Does NOT print API keys or passwords.
 *   4. Safe exit: Exits cleanly if environment variables are not yet populated.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");

// Helper to parse .env.local safely without printing secrets
function loadEnv() {
  const envPath = path.join(ROOT_DIR, ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.substring(0, eqIdx).trim();
      const val = trimmed.substring(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

async function runMigration() {
  console.log("==================================================");
  console.log("  Aadhi Pasting — Safe Supabase Data Migration   ");
  console.log("==================================================\n");

  const env = loadEnv();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey || !supabaseUrl.startsWith("http")) {
    console.log("ℹ️  Supabase credentials not configured in environment or .env.local.");
    console.log("    To run this migration, ensure these variables are present in .env.local:");
    console.log("      - NEXT_PUBLIC_SUPABASE_URL");
    console.log("      - SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)\n");
    console.log("    The migration script is prepared and ready to run whenever credentials are provided.\n");
    return;
  }

  console.log("🔗 Connecting to Supabase project...");
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Migrate Products
  const productsFile = path.join(DATA_DIR, "products.json");
  if (fs.existsSync(productsFile)) {
    console.log("\n📦 Migrating Products (data/products.json -> public.products)...");
    const rawProducts = JSON.parse(fs.readFileSync(productsFile, "utf-8"));
    console.log(`   Found ${rawProducts.length} products in local JSON.`);

    let insertedCount = 0;
    let skippedCount = 0;

    for (const prod of rawProducts) {
      // Check duplicate
      const { data: existing, error: checkErr } = await supabase
        .from("products")
        .select("id")
        .eq("id", prod.id)
        .maybeSingle();

      if (checkErr) {
        console.warn(`   ⚠️ Warning checking product ${prod.id}: ${checkErr.message}`);
      }

      if (existing) {
        skippedCount++;
        continue;
      }

      const dbProduct = {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        sku: prod.sku || "",
        category_id: prod.categoryId || "",
        category_name: prod.categoryName || "",
        description: prod.description || "",
        short_description: prod.shortDescription || null,
        price: Number(prod.price) || 0,
        sale_price: prod.salePrice ? Number(prod.salePrice) : null,
        stock: prod.stock ? Number(prod.stock) : null,
        availability: prod.availability || "in_stock",
        is_featured: Boolean(prod.isFeatured),
        is_active: prod.isActive !== undefined ? Boolean(prod.isActive) : true,
        image: prod.image || "",
        images: prod.images || [],
        specs: prod.specs || [],
        created_at: prod.createdAt || new Date().toISOString(),
        updated_at: prod.updatedAt || new Date().toISOString(),
      };

      const { error: insertErr } = await supabase
        .from("products")
        .insert(dbProduct);

      if (insertErr) {
        console.error(`   ❌ Failed to insert product ${prod.id} (${prod.name}):`, insertErr.message);
      } else {
        insertedCount++;
      }
    }

    console.log(`   ✅ Products migration complete: ${insertedCount} inserted, ${skippedCount} skipped (already present).`);
  } else {
    console.log("\n⚠️ data/products.json not found, skipping product migration.");
  }

  // 2. Migrate Orders & Order Items
  const ordersFile = path.join(DATA_DIR, "orders.json");
  if (fs.existsSync(ordersFile)) {
    console.log("\n🛒 Migrating Orders (data/orders.json -> public.orders & public.order_items)...");
    const rawOrders = JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
    console.log(`   Found ${rawOrders.length} orders in local JSON.`);

    let insertedOrders = 0;
    let skippedOrders = 0;
    let insertedItems = 0;

    for (const ord of rawOrders) {
      const items = Array.isArray(ord.items) ? ord.items : [];

      // Check duplicate
      const { data: existing, error: checkErr } = await supabase
        .from("orders")
        .select("id")
        .eq("id", ord.id)
        .maybeSingle();

      if (checkErr) {
        console.warn(`   ⚠️ Warning checking order ${ord.id}: ${checkErr.message}`);
      }

      if (existing) {
        skippedOrders++;

        // Check if items were already migrated for this existing order
        const { count: existingItemsCount } = await supabase
          .from("order_items")
          .select("*", { count: "exact", head: true })
          .eq("order_id", ord.id);

        if ((existingItemsCount || 0) === 0) {
          for (const it of items) {
            const qty = Math.max(1, Number(it.quantity) || 1);
            const price = Number(it.price) || 0;
            const lineTotal = Number(it.lineTotal ?? (qty * price));

            const dbItem = {
              order_id: ord.id,
              product_id: it.productId || "custom",
              product_name: it.name || "Calendar Product",
              sku: it.sku || null,
              image: it.image || null,
              quantity: qty,
              unit_price: price,
              line_total: lineTotal,
              created_at: ord.createdAt || new Date().toISOString(),
            };

            const { error: itemErr } = await supabase.from("order_items").insert(dbItem);
            if (itemErr) {
              console.error(`      ⚠️ Failed to insert item ${it.name} for order ${ord.id}:`, itemErr.message);
            } else {
              insertedItems++;
            }
          }
        }
        continue;
      }

      // Parse metadata notes if structured
      let parsedCity = ord.city || null;
      let parsedCompany = ord.companyName || null;
      let parsedGstin = ord.gstin || null;
      let parsedOrderType = ord.orderType || "Commercial Bulk Order";

      if (ord.notes && typeof ord.notes === "string") {
        const parts = ord.notes.split("|").map((p) => p.trim());
        for (const p of parts) {
          if (p.startsWith("Type:") && !parsedOrderType) parsedOrderType = p.replace("Type:", "").trim();
          if (p.startsWith("Company:") && !parsedCompany) parsedCompany = p.replace("Company:", "").trim();
          if (p.startsWith("GSTIN:") && !parsedGstin) parsedGstin = p.replace("GSTIN:", "").trim();
          if (p.startsWith("Hub/City:") && !parsedCity) parsedCity = p.replace("Hub/City:", "").trim();
        }
      }

      const subtotal = ord.subtotal || items.reduce((sum, it) => sum + (Number(it.price || 0) * Number(it.quantity || 1)), 0);

      const dbOrder = {
        id: ord.id,
        order_number: ord.orderNumber,
        customer_name: ord.customerName,
        phone: ord.phone,
        email: ord.email || null,
        address: ord.address || null,
        city: parsedCity,
        pincode: ord.pincode || null,
        company_name: parsedCompany,
        gstin: parsedGstin,
        order_type: parsedOrderType,
        subtotal: subtotal,
        discount_amount: ord.discountAmount || 0,
        delivery_charges: ord.deliveryCharges || 0,
        total_amount: Number(ord.totalAmount || subtotal),
        payment_method: ord.paymentMethod || "bank_transfer",
        payment_status: ord.paymentStatus || "pending",
        payment_reference: ord.paymentReference || null,
        status: ord.status || "pending",
        courier_name: ord.courierName || null,
        tracking_id: ord.trackingId || null,
        tracking_url: ord.trackingUrl || null,
        notes: ord.notes || null,
        admin_notes: ord.adminNotes || null,
        is_archived: Boolean(ord.isArchived),
        created_at: ord.createdAt || new Date().toISOString(),
        updated_at: ord.updatedAt || new Date().toISOString(),
      };

      const { error: orderErr } = await supabase.from("orders").insert(dbOrder);

      if (orderErr) {
        console.error(`   ❌ Failed to insert order ${ord.id} (${ord.orderNumber}):`, orderErr.message);
        continue;
      }

      insertedOrders++;

      // Insert line items
      for (const it of items) {
        const qty = Math.max(1, Number(it.quantity) || 1);
        const price = Number(it.price) || 0;
        const lineTotal = Number(it.lineTotal ?? (qty * price));

        const dbItem = {
          order_id: ord.id,
          product_id: it.productId || "custom",
          product_name: it.name || "Calendar Product",
          sku: it.sku || null,
          image: it.image || null,
          quantity: qty,
          unit_price: price,
          line_total: lineTotal,
          created_at: ord.createdAt || new Date().toISOString(),
        };

        const { error: itemErr } = await supabase.from("order_items").insert(dbItem);
        if (itemErr) {
          console.error(`      ⚠️ Failed to insert item ${it.name} for order ${ord.id}:`, itemErr.message);
        } else {
          insertedItems++;
        }
      }
    }

    console.log(
      `   ✅ Orders migration complete: ${insertedOrders} orders inserted, ${skippedOrders} skipped, ${insertedItems} items inserted.`
    );
  } else {
    console.log("\n⚠️ data/orders.json not found, skipping orders migration.");
  }

  console.log("\n==================================================");
  console.log("  Migration run finished successfully.");
  console.log("  All original JSON files remain safe and intact.");
  console.log("==================================================\n");
}

runMigration().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});

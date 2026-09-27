import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

function checkEnv() {
  const envPath = path.join(ROOT_DIR, ".env.local");
  if (!fs.existsSync(envPath)) {
    return {
      hasUrl: false,
      hasAnonKey: false,
      hasServiceKey: false,
      url: "",
      anonKey: "",
      serviceKey: "",
    };
  }

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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || "";

  return {
    hasUrl: Boolean(url && url.trim().length > 0 && url.startsWith("http")),
    hasAnonKey: Boolean(anonKey && anonKey.trim().length > 0),
    hasServiceKey: Boolean(serviceKey && serviceKey.trim().length > 0),
    url,
    anonKey,
    serviceKey,
  };
}

async function runReadOnlyCheck() {
  const envStatus = checkEnv();

  console.log("--- 1. ENVIRONMENT VARIABLES PRESENCE ---");
  console.log(`NEXT_PUBLIC_SUPABASE_URL present: ${envStatus.hasUrl}`);
  console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY present: ${envStatus.hasAnonKey}`);
  console.log(`SUPABASE_SERVICE_ROLE_KEY present: ${envStatus.hasServiceKey}`);

  if (!envStatus.hasUrl || !envStatus.hasServiceKey || !envStatus.hasAnonKey) {
    console.log("\nRESULT: Required variables are missing or incomplete in .env.local.");
    return;
  }

  console.log("\n--- 2. SERVER-SIDE SUPABASE CONNECTIVITY & TABLE ACCESS ---");
  try {
    const client = createClient(envStatus.url, envStatus.serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const tables = ["products", "orders", "order_items", "admin_users", "admin_security_logs"];
    let allAccessible = true;

    for (const table of tables) {
      const { count, error } = await client
        .from(table)
        .select("*", { count: "exact", head: true });

      if (error) {
        allAccessible = false;
        console.log(`Table [${table}]: Inaccessible (${error.message})`);
      } else {
        console.log(`Table [${table}]: Accessible (current row count: ${count ?? 0})`);
      }
    }

    console.log(`\nOverall Connection Status: ${allAccessible ? "SUCCESS" : "PARTIAL"}`);
    console.log(`Server-only client operational: ${allAccessible ? "YES" : "NO"}`);

    const migrationScriptExists = fs.existsSync(path.join(ROOT_DIR, "scripts", "migrate-to-supabase.mjs"));
    console.log(`Migration script ready: ${migrationScriptExists ? "YES" : "NO"}`);
  } catch (err) {
    console.log(`Connection test exception: ${err.message || "Unknown error"}`);
  }
}

runReadOnlyCheck();

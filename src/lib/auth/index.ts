import crypto from "crypto";
import { cookies } from "next/headers";
import { AdminUser, AdminSession } from "../db/types";
import { getAdminUserByEmail, getAdminUserById, saveSession, getSession, deleteSession, cleanExpiredSessions } from "../db";

const COOKIE_NAME = "aadhi_admin_session";
const SESSION_DURATION_HOURS = 24;

// PBKDF2 Password Hashing
export function hashPassword(password: string, existingSalt?: string): { salt: string; hash: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const testHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(testHash));
}

// Generate secure cryptographically random session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Create a new session and save to store
export async function createAdminSession(admin: AdminUser): Promise<AdminSession> {
  await cleanExpiredSessions();
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();

  const session: AdminSession = {
    token,
    userId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  await saveSession(session);
  return session;
}

// Set session cookie in HTTP Response
export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_HOURS * 3600,
  });
}

// Clear session cookie
export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// Get session from cookie
export async function getSessionFromCookie(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const session = await getSession(token);
    if (!session) return null;

    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      await deleteSession(token);
      return null;
    }

    return session;
  } catch (err) {
    return null;
  }
}

// Get authenticated admin user
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const session = await getSessionFromCookie();
  if (!session) return null;

  const admin = await getAdminUserById(session.userId);
  if (!admin) return null;

  return admin;
}

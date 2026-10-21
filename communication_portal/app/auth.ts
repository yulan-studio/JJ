import { env } from "cloudflare:workers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AppUser = {
  userId: string;
  username: "mom" | "JJ";
  displayName: string;
  email: string;
};

const COOKIE_NAME = "jj_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const encoder = new TextEncoder();

const users: Record<string, AppUser> = {
  mom: { userId: "mom", username: "mom", displayName: "mom", email: "mom@jj-space.local" },
  jj: { userId: "JJ", username: "JJ", displayName: "JJ", email: "jj@jj-space.local" },
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(value: string): Promise<string> {
  const secret = env.SESSION_SECRET?.trim();
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

async function secureEqual(left: string, right: string): Promise<boolean> {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const a = new Uint8Array(leftHash);
  const b = new Uint8Array(rightHash);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

export async function authenticate(username: string, password: string): Promise<AppUser | null> {
  const normalized = username.trim().toLowerCase();
  const user = users[normalized];
  const expected = normalized === "mom" ? env.MOM_PASSWORD : normalized === "jj" ? env.JJ_PASSWORD : undefined;
  if (!user || !expected || !(await secureEqual(password, expected))) return null;
  return user;
}

export async function createSessionToken(user: AppUser): Promise<string> {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ u: user.username, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })));
  return `${payload}.${await hmac(payload)}`;
}

async function verifySessionToken(token: string): Promise<AppUser | null> {
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra || !(await secureEqual(signature, await hmac(payload)))) return null;
    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { u?: string; exp?: number };
    if (!data.u || !data.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    return users[data.u.toLowerCase()] ?? null;
  } catch {
    return null;
  }
}

export async function getAppUser(): Promise<AppUser | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : null;
}

export async function requireAppUser(): Promise<AppUser> {
  const user = await getAppUser();
  if (!user) redirect("/login");
  return user;
}

export const sessionCookie = { name: COOKIE_NAME, maxAge: SESSION_SECONDS };

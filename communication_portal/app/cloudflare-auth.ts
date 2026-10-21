import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";

export type CloudflareUser = {
  userId: string;
  displayName: string;
  email: string;
};

const ACCESS_JWT_HEADER = "cf-access-jwt-assertion";

function accessIssuer(): string | null {
  const configured = env.CF_ACCESS_TEAM_DOMAIN?.trim();
  if (!configured) return null;
  const origin = configured.startsWith("https://") ? configured : `https://${configured}`;
  return origin.replace(/\/$/, "");
}

export async function getCloudflareUser(): Promise<CloudflareUser | null> {
  const issuer = accessIssuer();
  const audience = env.CF_ACCESS_AUD?.trim();
  const token = (await headers()).get(ACCESS_JWT_HEADER);

  // Local-only identity for `pnpm dev`. Never enabled in a production build.
  if (!issuer || !audience || !token) {
    if (process.env.NODE_ENV !== "production") {
      const email = env.DEV_AUTH_EMAIL?.trim() || "local@example.com";
      return { userId: `dev:${email}`, displayName: email.split("@")[0], email };
    }
    return null;
  }

  try {
    const jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
    const { payload } = await jwtVerify(token, jwks, {
      issuer,
      audience,
    });
    const email = typeof payload.email === "string" ? payload.email : null;
    const userId = typeof payload.sub === "string" ? payload.sub : null;
    if (!email || !userId) return null;
    return { userId, email, displayName: email.split("@")[0] };
  } catch {
    return null;
  }
}

export async function requireCloudflareUser(): Promise<CloudflareUser> {
  const user = await getCloudflareUser();
  if (!user) {
    throw new Error("Cloudflare Access identity is missing or invalid.");
  }
  return user;
}

import { env } from "cloudflare:workers";
import { getAppUser, sessionCookie } from "../../../auth";

export async function GET(request: Request) {
  const user = await getAppUser();
  if (user && env.DB) {
    await env.DB.prepare("UPDATE participants SET last_seen_at = ? WHERE user_id = ?")
      .bind(Date.now() - 15_001, user.userId)
      .run()
      .catch(() => undefined);
  }
  return new Response(null, { status: 303, headers: { Location: new URL("/login", request.url).toString(), "Set-Cookie": `${sessionCookie.name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
}

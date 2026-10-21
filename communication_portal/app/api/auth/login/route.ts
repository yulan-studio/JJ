import { authenticate, createSessionToken, sessionCookie } from "../../../auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { username?: string; password?: string } | null;
  try {
    const user = await authenticate(String(body?.username ?? ""), String(body?.password ?? ""));
    if (!user) return Response.json({ error: "Incorrect username or password" }, { status: 401 });
    const token = await createSessionToken(user);
    return new Response(null, { status: 204, headers: { "Set-Cookie": `${sessionCookie.name}=${token}; Path=/; Max-Age=${sessionCookie.maxAge}; HttpOnly; Secure; SameSite=Lax` } });
  } catch {
    return Response.json({ error: "Sign-in is not configured yet. Please contact the administrator." }, { status: 503 });
  }
}

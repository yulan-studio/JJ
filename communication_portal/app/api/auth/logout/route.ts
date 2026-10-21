import { sessionCookie } from "../../../auth";

export async function GET(request: Request) {
  return new Response(null, { status: 303, headers: { Location: new URL("/login", request.url).toString(), "Set-Cookie": `${sessionCookie.name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
}

import { env } from "cloudflare:workers";
import { getAppUser } from "../../../auth";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const user = await getAppUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { key } = await context.params;
  const object = await env.BUCKET.get(key.join("/"));
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "private, max-age=3600");
  headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}

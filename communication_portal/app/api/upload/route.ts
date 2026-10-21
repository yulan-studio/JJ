import { env } from "cloudflare:workers";
import { getAppUser } from "../../auth";

export async function POST(request: Request) {
  const user = await getAppUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "missing file" }, { status: 400 });
  if (file.size > 25 * 1024 * 1024) return Response.json({ error: "file too large" }, { status: 413 });
  if (!/^(image|video|audio)\//.test(file.type)) return Response.json({ error: "unsupported file" }, { status: 415 });
  const ext = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").slice(0, 8) || "bin";
  const key = `${user.userId}/${crypto.randomUUID()}.${ext}`;
  await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type }, customMetadata: { owner: user.userId } });
  return Response.json({ url: `/api/media/${encodeURIComponent(key)}` }, { status: 201 });
}

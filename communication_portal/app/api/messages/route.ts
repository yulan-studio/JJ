import { env } from "cloudflare:workers";
import { getAppUser } from "../../auth";

async function ensureParticipant() {
  const user = await getAppUser();
  if (!user) return null;
  const existing = await env.DB.prepare("SELECT user_id FROM participants WHERE user_id = ?").bind(user.userId).first();
  if (!existing) {
    const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM participants").first<{ total: number }>();
    if ((count?.total ?? 0) >= 2) return null;
    await env.DB.prepare("INSERT INTO participants (user_id, display_name, email, joined_at) VALUES (?, ?, ?, ?)").bind(user.userId, user.displayName, user.email, Date.now()).run();
  } else {
    await env.DB.prepare("UPDATE participants SET display_name = ?, email = ? WHERE user_id = ?").bind(user.displayName, user.email, user.userId).run();
  }
  return user;
}

export async function GET() {
  const user = await ensureParticipant();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 403 });
  const result = await env.DB.prepare(`SELECT m.id, m.author_id AS authorId, p.display_name AS authorName, m.content, m.type, m.media_key AS mediaKey, m.created_at AS createdAt, m.reply_to AS replyTo, r.content AS replyContent, rp.display_name AS replyAuthor FROM messages m JOIN participants p ON p.user_id = m.author_id LEFT JOIN messages r ON r.id = m.reply_to LEFT JOIN participants rp ON rp.user_id = r.author_id ORDER BY m.id ASC LIMIT 500`).all();
  const messages = result.results.map((row: any) => ({ ...row, mediaUrl: row.mediaKey ? `/api/media/${encodeURIComponent(row.mediaKey)}` : null, createdAt: new Date(row.createdAt).toISOString() }));
  return Response.json({ messages });
}

export async function POST(request: Request) {
  const user = await ensureParticipant();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 403 });
  const body = await request.json() as { content?: string; type?: string; mediaUrl?: string; replyTo?: number | null };
  const type = ["text", "image", "video", "audio"].includes(body.type ?? "") ? body.type! : "text";
  const content = String(body.content ?? "").trim().slice(0, 5000);
  const mediaKey = body.mediaUrl?.startsWith("/api/media/") ? decodeURIComponent(body.mediaUrl.slice(11)) : null;
  if (!content && !mediaKey) return Response.json({ error: "empty" }, { status: 400 });
  await env.DB.prepare("INSERT INTO messages (author_id, content, type, media_key, reply_to, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(user.userId, content, type, mediaKey, body.replyTo ?? null, Date.now()).run();
  return Response.json({ ok: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const user = await getAppUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return Response.json({ error: "invalid message id" }, { status: 400 });
  }

  const message = await env.DB.prepare("SELECT author_id AS authorId, media_key AS mediaKey FROM messages WHERE id = ?")
    .bind(id)
    .first<{ authorId: string; mediaKey: string | null }>();
  if (!message) return Response.json({ error: "message not found" }, { status: 404 });
  if (message.authorId !== user.userId) {
    return Response.json({ error: "you can only delete your own messages" }, { status: 403 });
  }

  await env.DB.batch([
    env.DB.prepare("UPDATE messages SET reply_to = NULL WHERE reply_to = ?").bind(id),
    env.DB.prepare("DELETE FROM messages WHERE id = ? AND author_id = ?").bind(id, user.userId),
  ]);
  if (message.mediaKey) await env.BUCKET.delete(message.mediaKey).catch(() => undefined);
  return Response.json({ ok: true });
}

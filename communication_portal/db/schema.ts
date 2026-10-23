import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const participants = sqliteTable("participants", {
  userId: text("user_id").primaryKey(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  joinedAt: integer("joined_at", { mode: "timestamp" }).notNull(),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp" }),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorId: text("author_id").notNull(),
  content: text("content").notNull().default(""),
  type: text("type").notNull().default("text"),
  mediaKey: text("media_key"),
  replyTo: integer("reply_to"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

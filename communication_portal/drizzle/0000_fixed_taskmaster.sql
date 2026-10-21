CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author_id` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`media_key` text,
	`reply_to` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`user_id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`email` text NOT NULL,
	`joined_at` integer NOT NULL
);

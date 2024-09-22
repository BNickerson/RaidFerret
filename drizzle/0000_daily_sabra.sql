CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar NOT NULL,
	"guild_id" varchar NOT NULL
);

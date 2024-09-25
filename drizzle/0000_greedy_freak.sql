CREATE SCHEMA "raidscurry";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raidscurry"."group" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_blueprint_id" integer NOT NULL,
	"owner_id" varchar,
	"guild_id" varchar,
	"name" varchar,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raidscurry"."group_blueprint" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar,
	"name" varchar,
	"description" varchar,
	"owner_id" varchar,
	"allowFill" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raidscurry"."group_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"member_id" varchar,
	"role_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raidscurry"."group_role_blueprint" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_blueprint_id" integer NOT NULL,
	"name" varchar,
	"emoji_id" varchar,
	"count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raidscurry"."members" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar NOT NULL,
	"guild_id" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raidscurry"."group" ADD CONSTRAINT "group_group_blueprint_id_group_blueprint_id_fk" FOREIGN KEY ("group_blueprint_id") REFERENCES "raidscurry"."group_blueprint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raidscurry"."group_member" ADD CONSTRAINT "group_member_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "raidscurry"."group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raidscurry"."group_role_blueprint" ADD CONSTRAINT "group_role_blueprint_group_blueprint_id_group_blueprint_id_fk" FOREIGN KEY ("group_blueprint_id") REFERENCES "raidscurry"."group_blueprint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

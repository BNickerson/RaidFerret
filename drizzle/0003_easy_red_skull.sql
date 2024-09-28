CREATE TABLE IF NOT EXISTS "raid_scurry"."track" (
	"id" serial PRIMARY KEY NOT NULL,
	"guild_id" varchar,
	"name" varchar,
	"description" varchar,
	"owner_id" varchar,
	"base_xp" integer,
	"base_xp_randomize_percent" integer,
	"xp_multiplier" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raid_scurry"."track_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_id" varchar,
	"track_id" integer NOT NULL,
	"track_value" integer,
	"track_level" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raid_scurry"."track_reward" (
	"id" serial PRIMARY KEY NOT NULL,
	"track_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"value" varchar,
	"level" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raid_scurry"."track_member" ADD CONSTRAINT "track_member_track_id_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "raid_scurry"."track"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raid_scurry"."track_reward" ADD CONSTRAINT "track_reward_track_id_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "raid_scurry"."track"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

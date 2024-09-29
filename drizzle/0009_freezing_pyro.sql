ALTER TABLE "track_reward" RENAME COLUMN "role_ids" TO "role_id";--> statement-breakpoint
ALTER TABLE "track_reward" ALTER COLUMN "role_id" SET DATA TYPE varchar;
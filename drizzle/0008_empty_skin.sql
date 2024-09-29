ALTER TABLE "track_reward" ADD COLUMN "is_role_reward" boolean;--> statement-breakpoint
ALTER TABLE "track_reward" ADD COLUMN "role_ids" jsonb;
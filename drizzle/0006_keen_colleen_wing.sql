CREATE INDEX IF NOT EXISTS "track_member_track_id_idx" ON "track_member" USING btree ("track_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "track_member_member_id_idx" ON "track_member" USING btree ("member_id");
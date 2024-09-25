ALTER SCHEMA "raidscurry" RENAME TO "raid_scurry";
--> statement-breakpoint
ALTER TABLE "raid_scurry"."group" DROP CONSTRAINT "group_group_blueprint_id_group_blueprint_id_fk";
--> statement-breakpoint
ALTER TABLE "raid_scurry"."group_member" DROP CONSTRAINT "group_member_group_id_group_id_fk";
--> statement-breakpoint
ALTER TABLE "raid_scurry"."group_role_blueprint" DROP CONSTRAINT "group_role_blueprint_group_blueprint_id_group_blueprint_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raid_scurry"."group" ADD CONSTRAINT "group_group_blueprint_id_group_blueprint_id_fk" FOREIGN KEY ("group_blueprint_id") REFERENCES "raid_scurry"."group_blueprint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raid_scurry"."group_member" ADD CONSTRAINT "group_member_group_id_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "raid_scurry"."group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raid_scurry"."group_role_blueprint" ADD CONSTRAINT "group_role_blueprint_group_blueprint_id_group_blueprint_id_fk" FOREIGN KEY ("group_blueprint_id") REFERENCES "raid_scurry"."group_blueprint"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

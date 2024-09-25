import {
  boolean,
  integer,
  pgSchema,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const raidScurrySchema = pgSchema('raid_scurry');

export const members = raidScurrySchema.table('members', {
  id: serial('id').primaryKey(),
  discordId: varchar('discord_id').notNull(),
  guildId: varchar('guild_id').notNull(),
});

export const groupBlueprint = raidScurrySchema.table('group_blueprint', {
  id: serial('id').primaryKey(),
  guildId: varchar('discord_id'), // if guildId exists, it is specific to that guild only - otherwise it's a global blueprint
  name: varchar('name'),
  description: varchar('description'),
  ownerId: varchar('owner_id'),
  allowFill: boolean('allow_fill'),
});

export const groupRoleBlueprint = raidScurrySchema.table(
  'group_role_blueprint',
  {
    id: serial('id').primaryKey(),
    groupBlueprintId: integer('group_blueprint_id')
      .references(() => groupBlueprint.id)
      .notNull(),
    name: varchar('name'),
    emojiId: varchar('emoji_id'),
    count: integer('count'),
  },
);

export const group = raidScurrySchema.table('group', {
  id: serial('id').primaryKey(),
  groupBlueprintId: integer('group_blueprint_id')
    .references(() => groupBlueprint.id)
    .notNull(),
  ownerId: varchar('owner_id'),
  guildId: varchar('guild_id'),
  name: varchar('name'),
  description: varchar('description'),
});

export const groupMember = raidScurrySchema.table('group_member', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => group.id)
    .notNull(),
  memberId: varchar('member_id'),
  roleId: integer('role_id'),
});

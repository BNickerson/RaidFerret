import {
  integer,
  pgSchema,
  pgTable,
  serial,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

export const groupSchema = pgSchema('group');

export const groupBlueprint = groupSchema.table('group_blueprint', {
  id: serial('id').primaryKey(),
  guildId: varchar('discord_id'), // if guildId exists, it is specific to that guild only - otherwise it's a global blueprint
  name: varchar('name'),
  description: varchar('description'),
  ownerId: varchar('owner_id'),
  allowFill: boolean('allowFill'),
});

export const groupRoleBlueprint = groupSchema.table('group_role_blueprint', {
  id: serial('id').primaryKey(),
  groupBlueprintId: integer('group_blueprint_id')
    .references(() => groupBlueprint.id)
    .notNull(),
  name: varchar('name'),
  emojiId: varchar('emoji_id'),
  count: integer('count'),
});

export const group = groupSchema.table('group', {
  id: serial('id').primaryKey(),
  groupBlueprintId: integer('group_blueprint_id')
    .references(() => groupBlueprint.id)
    .notNull(),
  ownerId: varchar('owner_id'),
  guildId: varchar('guild_id'),
  name: varchar('name'),
  description: varchar('description'),
});

export const groupMember = groupSchema.table('group_member', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => group.id)
    .notNull(),
  memberId: varchar('member_id'),
  roleId: integer('role_id'),
});

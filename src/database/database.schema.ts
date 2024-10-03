import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  discordId: varchar('discord_id').notNull(),
  guildId: varchar('guild_id').notNull(),
});

export const groupBlueprint = pgTable('group_blueprint', {
  id: serial('id').primaryKey(),
  guildId: varchar('discord_id'), // if guildId exists, it is specific to that guild only - otherwise it's a global blueprint
  name: varchar('name'),
  description: varchar('description'),
  ownerId: varchar('owner_id'),
  allowFill: boolean('allow_fill'),
});

export const groupRoleBlueprint = pgTable('group_role_blueprint', {
  id: serial('id').primaryKey(),
  groupBlueprintId: integer('group_blueprint_id')
    .references(() => groupBlueprint.id)
    .notNull(),
  name: varchar('name'),
  emojiId: varchar('emoji_id'),
  count: integer('count'),
});

export const group = pgTable('group', {
  id: serial('id').primaryKey(),
  groupBlueprintId: integer('group_blueprint_id')
    .references(() => groupBlueprint.id)
    .notNull(),
  ownerId: varchar('owner_id'),
  guildId: varchar('guild_id'),
  name: varchar('name'),
  description: varchar('description'),
});

export const groupMember = pgTable('group_member', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => group.id)
    .notNull(),
  memberId: varchar('member_id'),
  roleId: integer('role_id'),
});

export const track = pgTable('track', {
  id: serial('id').primaryKey(),
  guildId: varchar('guild_id'),
  name: varchar('name'),
  description: varchar('description'),
  ownerId: varchar('owner_id'),
  baseXp: integer('base_xp'),
  baseXpRandomizePercent: integer('base_xp_randomize_percent'),
  xpMultiplier: integer('xp_multiplier'),
  cooldownSeconds: integer('cooldown_seconds'),
  logChannelId: varchar('log_channel_id'),
});

export const trackReward = pgTable('track_reward', {
  id: serial('id').primaryKey(),
  trackId: integer('track_id')
    .references(() => track.id)
    .notNull(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  isRoleReward: boolean('is_role_reward'),
  roleId: varchar('role_id'),
  level: integer('level').notNull(),
});

export const trackMember = pgTable(
  'track_member',
  {
    id: serial('id').primaryKey(),
    memberId: varchar('member_id'),
    trackId: integer('track_id').references(() => track.id),
    trackXp: integer('track_value'),
    trackLevel: integer('track_level'),
  },
  (trackMember) => {
    return {
      trackIdIdx: index('track_member_track_id_idx').on(trackMember.trackId),
      memberIdIdx: index('track_member_member_id_idx').on(trackMember.memberId),
    };
  },
);

export const trackMemberRelations = relations(trackMember, ({ one }) => ({
  track: one(track, {
    fields: [trackMember.id],
    references: [track.id],
    relationName: 'track',
  }),
}));

import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  discordId: varchar('discord_id').notNull(),
  guildId: varchar('guild_id').notNull(),
});

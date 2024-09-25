import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { ListenersModule } from './discord/events/events.module';
import { CommandsModule } from './discord/commands/commands.module';
import { GroupsModule } from './groups/groups.module';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MembersModule,
    GroupsModule,
    ListenersModule,
    DiscordModule,
  ],
  providers: [],
})
export class AppModule {}

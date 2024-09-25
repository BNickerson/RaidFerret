import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './app.update';
import { ConfigModule } from '@nestjs/config';
import { GroupCommand } from './commands/group.command';
import { PingCommand } from './commands/ping.command';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { ListenersModule } from './listeners/listeners.module';
import { MessageCreateService } from './listeners/messageCreate.service';
import { CommandsModule } from './commands/commands.module';
import { GroupsService } from './groups/groups.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NecordModule.forRoot({
      token: process.env.BOT_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
      development: [process.env.DEV_GUILD],
    }),
    CommandsModule,
    DatabaseModule,
    MembersModule,
    ListenersModule,
  ],
  providers: [AppUpdate, GroupsService],
})
export class AppModule {}

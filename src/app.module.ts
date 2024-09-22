import { CommandsModule, NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { AppUpdate } from './app.update';
import { ConfigModule } from '@nestjs/config';
import { GroupCommand } from './commands/group.command';
import { PingCommand } from './commands/ping.command';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NecordModule.forRoot({
      token: process.env.BOT_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
      development: [process.env.DEV_GUILD],
    }),
    CommandsModule,
    DatabaseModule,
    MembersModule,
  ],
  providers: [AppUpdate, GroupCommand, PingCommand],
})
export class AppModule {}

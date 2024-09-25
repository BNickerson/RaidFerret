import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { ConfigModule } from '@nestjs/config';
import { CommandsModule } from './commands/commands.module';
import { ListenersModule } from './events/events.module';

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
    ListenersModule,
    CommandsModule,
  ],
  providers: [],
})
export class DiscordModule {}

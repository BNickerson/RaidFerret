import { Module } from '@nestjs/common';
import { MessageCreateEvent } from './messageCreate.event';
import { ReadyEvent } from './ready.event';
import { TracksService } from 'src/tracks/tracks.service';
import { DatabaseModule } from 'src/database/database.module';
import { DiscordService } from '../services/discord.service';

@Module({
  imports: [DatabaseModule],
  providers: [MessageCreateEvent, ReadyEvent, TracksService, DiscordService],
})
export class EventsModule {}

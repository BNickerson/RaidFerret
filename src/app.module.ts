import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { EventsModule } from './discord/events/events.module';
import { GroupsModule } from './groups/groups.module';
import { DiscordModule } from './discord/discord.module';
import { TracksService } from './tracks/tracks.service';
import { DiscordService } from './discord/services/discord.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MembersModule,
    GroupsModule,
    DiscordModule,
  ],
  providers: [TracksService, DiscordService],
})
export class AppModule {}

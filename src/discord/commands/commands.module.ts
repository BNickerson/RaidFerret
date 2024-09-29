import { Module } from '@nestjs/common';
import { GroupCommand } from './groups/group.command';
import { PingCommand } from './ping.command';
import { GroupInviteCommand } from './groups/group_invite.command';
import { LevelCommand } from './tracks/level.command';
import { DatabaseModule } from 'src/database/database.module';
import { TracksService } from 'src/tracks/tracks.service';
import { DiscordService } from '../services/discord.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    GroupCommand,
    PingCommand,
    GroupInviteCommand,
    LevelCommand,
    TracksService,
    DiscordService,
  ],
})
export class CommandsModule {}

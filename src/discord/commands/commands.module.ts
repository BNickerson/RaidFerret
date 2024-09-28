import { Module } from '@nestjs/common';
import { GroupCommand } from './group.command';
import { PingCommand } from './ping.command';
import { GroupInviteCommand } from './group_invite.command';

@Module({
  imports: [],
  providers: [GroupCommand, PingCommand, GroupInviteCommand],
})
export class CommandsModule {}

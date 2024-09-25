import { Module } from '@nestjs/common';
import { GroupCommand } from './group.command';
import { PingCommand } from './ping.command';

@Module({
  imports: [],
  providers: [GroupCommand, PingCommand],
})
export class CommandsModule {}

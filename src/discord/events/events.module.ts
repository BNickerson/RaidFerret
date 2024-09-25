import { Module } from '@nestjs/common';
import { MessageCreateEvent } from './messageCreate.event';
import { ReadyEvent } from './ready.event';

@Module({
  imports: [],
  providers: [MessageCreateEvent, ReadyEvent],
})
export class ListenersModule {}

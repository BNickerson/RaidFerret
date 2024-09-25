import { Module } from '@nestjs/common';
import { MessageCreateService } from './messageCreate.service';

@Module({
  imports: [],
  providers: [MessageCreateService],
})
export class ListenersModule {}

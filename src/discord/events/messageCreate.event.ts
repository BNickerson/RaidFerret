import { Injectable, Logger } from '@nestjs/common';
import { Once, On, Context, ContextOf } from 'necord';

@Injectable()
export class MessageCreateEvent {
  private readonly logger = new Logger(MessageCreateEvent.name);

  @On('messageCreate')
  public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    //this.logger.log(`Message from ${message.author.tag}: ${message.content}`);
  }
}

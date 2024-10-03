import { Injectable, Logger } from '@nestjs/common';
import { Once, On, Context, ContextOf } from 'necord';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class MessageCreateEvent {
  private readonly logger = new Logger(MessageCreateEvent.name);
  private memberCooldowns = new Map<string, number>();

  // inject TracksService
  constructor(private tracksService: TracksService) {}

  @On('messageCreate')
  public async onMessageCreate(
    @Context() [message]: ContextOf<'messageCreate'>,
  ) {
    if (message.author.bot) return;
    await this.tracksService.processMessageXp(
      message.guild.id,
      message.author.id,
    );
  }
}

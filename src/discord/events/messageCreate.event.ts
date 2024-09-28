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
    //this.logger.log(`Message from ${message.author.tag}: ${message.content}`);
    if (message.author.bot) return;
    if (this.memberCooldowns.has(message.author.id)) return;
    this.memberCooldowns.set(message.author.id, Date.now() + 10000);
    setTimeout(() => {
      this.memberCooldowns.delete(message.author.id);
    }, 10000);

    const tracks = await this.tracksService.getTracksByGuildId(
      message.guild.id,
    );
    if (!tracks) return;

    for (const track of tracks) {
      const trackMember =
        await this.tracksService.getTrackMemberByTrackIdAndMemberId(
          track.id,
          message.author.id,
        );

      this.tracksService.addXpToTrackMember(
        track.id,
        message.author.id,
        Math.floor(Math.random() * (25 - 15 + 1)) + 15,
      );
    }
  }
}

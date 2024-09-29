import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class LevelCommand {
  constructor(private tracksService: TracksService) {}

  @SlashCommand({
    name: 'level',
    description: 'check level and track progress',
  })
  public async onSlashCommand(@Context() [interaction]: SlashCommandContext) {
    const memberTracks = await this.tracksService.getTrackMemberByMemberId(
      interaction.user.id,
    );
    if (!memberTracks) {
      return interaction.reply({
        content: `You haven't progressed on any tracks yet.`,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('Track Progress')
      .setDescription('Here is your progress on all tracks you are in.')
      .setFields([
        {
          name: 'Tracks',
          value: memberTracks
            .map((memberTrack) => memberTrack.track.name)
            .join('\n'),
          inline: true,
        },
        {
          name: 'Progress',
          value: memberTracks
            .map(
              (memberTrack) => `${memberTrack.trackXp}/${memberTrack.trackXp}`,
            )
            .join('\n'),
          inline: true,
        },
      ]);

    return interaction.reply({ content: 'Pong!', embeds: [embed] });
  }
}

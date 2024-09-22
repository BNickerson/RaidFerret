import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class GroupCommand {
  @SlashCommand({
    name: 'group',
    description: 'start a group',
  })
  public async onInteraction(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }
}

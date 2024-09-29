import { Injectable } from '@nestjs/common';
import {
  Context,
  SlashCommand,
  SlashCommandContext,
  UserCommand,
  UserCommandContext,
} from 'necord';

const inviteUI = {};

@Injectable()
export class GroupCommand {
  @SlashCommand({
    name: 'group',
    description: 'start a group',
  })
  public async onSlashCommand(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }
}

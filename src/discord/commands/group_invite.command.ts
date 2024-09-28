import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import {
  Context,
  SlashCommand,
  SlashCommandContext,
  UserCommand,
  UserCommandContext,
} from 'necord';

function getInviteUI() {
  const embed = new EmbedBuilder();
}

@Injectable()
export class GroupInviteCommand {
  @SlashCommand({
    name: 'group_invite',
    description: 'invite member to group',
  })
  public async onSlashCommand(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }

  @UserCommand({
    name: 'Invite to Group',
  })
  public async onUserCommand(@Context() [interaction]: UserCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }
}

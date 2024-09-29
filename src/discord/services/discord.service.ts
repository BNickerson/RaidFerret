import { Injectable, Logger } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js'; // Or import from Necord

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);
  constructor(private readonly client: Client) {}

  /**
   * Sends a message to the user who leveled up.
   * @param channelId - The ID of the channel where the message should be sent.
   * @param userId - The ID of the user who leveled up.
   * @param message - The message to send.
   */
  public async sendLevelUpMessage(
    channelId: string,
    userId: string,
    message: string,
  ) {
    const channel = (await this.client.channels.fetch(
      channelId,
    )) as TextChannel;
    if (!channel) {
      throw new Error('Channel not found');
    }

    // Send message to the channel mentioning the user
    await channel.send(`<@${userId}> ${message}`);
  }

  public async addMembertoRoles(
    guildId: string,
    memberId: string,
    roleIds: string[],
  ) {
    const guild = await this.client.guilds.fetch(guildId);
    const member = await guild.members.fetch(memberId);

    for (const roleId of roleIds) {
      const role = await guild.roles.fetch(roleId);
      await member.roles.add(role);
    }
  }
}

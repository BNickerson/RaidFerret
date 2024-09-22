import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class PingCommand {
  @SlashCommand({
    name: 'ping',
    description: 'check the bot latency',
  })
  public async onInteraction(@Context() [interaction]: SlashCommandContext) {
    const latency = interaction.client.ws.ping;
    return interaction.reply({ content: `Pong! \`${latency}ms\`` });
  }
}

import { sendToWebhook } from "@shared/utils/embedErrorLog";
import { sleep } from "@shared/utils/sleep";
import { CommandInteraction, MessageFlags } from "discord.js";

class CleanChatService {
  public async execute(interaction: CommandInteraction) {
    if (interaction.inGuild()) return;

    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });

    const channel = interaction.channel;

    if (!channel || !channel.isTextBased()) {
      await interaction.followUp({
        content: "Não é possível limpar o chat.",
        ephemeral: true,
      });
      return;
    }

    const messages = await channel.messages.fetch({ limit: 100 });

    let deleted = 0;
    for (const message of messages.values()) {
      try {
        if (message.author.id !== interaction.client.user?.id) {
          continue;
        }

        await message.delete();
        deleted++;
        await sleep(1000);
      } catch (error) {
        console.error(`Erro ao apagar mensagem ${message.id}:`, error);
        await sendToWebhook(error as string);
      }
    }

    await interaction.followUp({
      content: `Apagadas ${deleted} mensagens.`,
      ephemeral: true,
    });
  }
}

export const cleanChatService = new CleanChatService();

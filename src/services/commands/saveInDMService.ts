import { sendSavedToDMService } from "@services/common/sendSavedToDM";
import { CacheType, CommandInteraction, MessageFlags } from "discord.js";

class SaveInDMService {
  public async save(interaction: CommandInteraction<CacheType>) {
    if (!interaction.isMessageContextMenuCommand()) return;
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });
    if (!interaction.targetMessage) {
      await interaction.editReply({
        content: "Não consegui encontrar a mensagem.",
      });
      return;
    }

    const message = interaction.targetMessage;
    const user = interaction.user;
    const channel = await user.createDM();
    const guildId = interaction.guildId;
    const isDm = interaction.context == 1 || interaction.context == 2;

    if (!channel) {
      await interaction.editReply({
        content: "Não consegui criar um canal DM com você.",
      });
      return;
    }

    await sendSavedToDMService.execute(message, user, isDm, guildId);

    await interaction.editReply({
      content: "Mensagem salva na DM.",
    });
  }
}

export const saveInDMService = new SaveInDMService();

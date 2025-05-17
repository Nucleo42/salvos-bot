import { messageFormatter } from "@services/common/messageFormatter";
import { sendSavedToDMService } from "@services/common/sendSavedToDM";
import { CacheType, CommandInteraction, MessageFlags } from "discord.js";

class SaveDMService {
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

    const data = messageFormatter.formatMessageData(
      message,
      isDm,
      undefined,
      guildId,
    );

    await sendSavedToDMService.execute({
      user,
      formattedMessage: data,
    });

    await interaction.editReply({
      content: "Mensagem salva na DM.",
    });
  }
}

export const saveDMService = new SaveDMService();

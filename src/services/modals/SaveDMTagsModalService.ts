import { SaveDMTagsData } from "@services/commands/SaveDMTagsService";
import { sendSavedToDMService } from "@services/common/sendSavedToDM";
import { levelDB } from "@storage/levelDB";
import { CacheType, MessageFlags, ModalSubmitInteraction } from "discord.js";

class SaveDMTagsModalService {
  public async execute(interaction: ModalSubmitInteraction<CacheType>) {
    const campo1 = interaction.fields.getTextInputValue("save_dm_tags_input");

    const tags = campo1
      .split(",")
      .map((tag) => tag.trim())
      .join(" • ");

    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });

    const data = await levelDB.getData<SaveDMTagsData>(
      "save_dm_tags",
      interaction.user.id,
    );

    if (!data) {
      await interaction.editReply({
        content: "Não consegui encontrar os dados.",
      });
      return;
    }

    const { message } = data;
    const user = interaction.user;

    message.tags = tags;

    await sendSavedToDMService.execute({
      user,
      formattedMessage: message,
    });

    await interaction.editReply({
      content: `Mensagem salva!`,
    });

    await levelDB.delete("save_dm_tags", interaction.user.id);
  }
}

export const saveDMTagsModalService = new SaveDMTagsModalService();

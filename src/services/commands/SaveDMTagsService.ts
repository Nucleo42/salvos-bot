import {
  FormattedMessageData,
  messageFormatter,
} from "@services/common/messageFormatter";
import { levelDB } from "@storage/levelDB";
import {
  ActionRowBuilder,
  CacheType,
  CommandInteraction,
  InteractionContextType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export interface SaveDMTagsData {
  userId: string;
  message: FormattedMessageData;
  guildId: string | null;
}

class SaveDMTagsService {
  public async save(interaction: CommandInteraction<CacheType>) {
    if (!interaction.isMessageContextMenuCommand()) return;

    const userId = interaction.user.id;

    const modal = new ModalBuilder()
      .setCustomId("save_dm_tags")
      .setTitle("Salvar mensagem com tags");

    const input = new TextInputBuilder()
      .setCustomId(`save_dm_tags_input`)
      .setLabel("Digite as tag separada por vírgulas:")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("Exemplo: develop, ux, tips, tag4, tag5")
      .setMinLength(1);

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input);
    modal.addComponents(row);

    const isDM =
      interaction.context == InteractionContextType.PrivateChannel ||
      interaction.context == InteractionContextType.BotDM;

    const messageFormatted = messageFormatter.formatMessageData(
      interaction.targetMessage,
      isDM,
      undefined,
      interaction.guildId,
    );

    const data = {
      userId,
      message: messageFormatted,
      guildId: interaction.guildId,
    };

    await levelDB.setData<SaveDMTagsData>("save_dm_tags", userId, data);

    await interaction.showModal(modal);
  }
}

export const saveDMTagsService = new SaveDMTagsService();

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  User,
  DMChannel,
  PartialUser,
} from "discord.js";
import { FormattedMessageData } from "./messageFormatter";

interface ISendSavedToDMServiceProps {
  user: User | PartialUser;
  formattedMessage: FormattedMessageData;
}

class SendSavedToDMService {
  public async execute({
    user,
    formattedMessage,
  }: ISendSavedToDMServiceProps): Promise<void> {
    const dmChannel = await this.createUserDMChannel(user);
    if (!dmChannel) return;

    const components = this.buildActionRow(formattedMessage.messageLink);
    const embed = this.buildEmbed(formattedMessage);

    await dmChannel.send({
      embeds: [embed],
      components: [components],
    });
  }

  private async createUserDMChannel(
    user: User | PartialUser,
  ): Promise<DMChannel | null> {
    try {
      return await user.createDM();
    } catch (error) {
      console.error("Erro ao criar canal de DM:", error);
      return null;
    }
  }

  private buildActionRow(
    messageLink: string | null,
  ): ActionRowBuilder<ButtonBuilder> {
    const components: ButtonBuilder[] = [
      new ButtonBuilder()
        .setCustomId("delete-save")
        .setLabel("Apagar")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🗑️"),
    ];

    if (messageLink) {
      components.push(
        new ButtonBuilder()
          .setLabel("Acessar original")
          .setStyle(ButtonStyle.Link)
          .setEmoji("🔗")
          .setURL(messageLink),
      );
    }

    return new ActionRowBuilder<ButtonBuilder>().setComponents(components);
  }

  private buildEmbed(data: FormattedMessageData): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor("#9b33da")
      .setAuthor({ name: data.authorName, iconURL: data.authorIconURL })
      .setDescription(data.content);

    if (data.tags) {
      embed.addFields({ name: "🏷️ Tags:", value: data.tags, inline: true });
    }

    return embed;
  }
}

export const sendSavedToDMService = new SendSavedToDMService();

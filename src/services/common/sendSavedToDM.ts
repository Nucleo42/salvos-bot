import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  User,
  Message,
  PartialMessage,
  DMChannel,
  PartialUser,
} from "discord.js";

class SendSavedToDMService {
  public async execute(
    message: Message<boolean>,
    user: User | PartialUser,
    isDM: boolean = false,
    guildId: string | null = null,
  ): Promise<void> {
    const dmChannel = await this.createUserDMChannel(user);
    if (!dmChannel) return;

    const components = this.buildActionRow(message, isDM, guildId);
    const embed = this.buildEmbed(message, isDM);

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
    message: Message<boolean>,
    isDM: boolean,
    guildId: string | null,
  ): ActionRowBuilder<ButtonBuilder> {
    const components: ButtonBuilder[] = [
      new ButtonBuilder()
        .setCustomId("delete-save")
        .setLabel("Apagar")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🗑️"),
    ];

    const messageLink = this.getMessageLink(message, isDM, guildId);
    if (messageLink) {
      components.push(
        new ButtonBuilder()
          .setLabel("Ver original")
          .setStyle(ButtonStyle.Link)
          .setEmoji("🔗")
          .setURL(messageLink),
      );
    }

    return new ActionRowBuilder<ButtonBuilder>().setComponents(components);
  }

  private getMessageLink(
    message: Message<boolean>,
    isDM: boolean,
    guildId: string | null,
  ): string | null {
    const hasGuild = guildId || message.guild?.id;

    if (isDM || !hasGuild) return null;
    return `https://discord.com/channels/${hasGuild}/${message.channelId}/${message.id}`;
  }

  private buildEmbed(
    message: Message<boolean> | PartialMessage,
    isDM: boolean,
  ): EmbedBuilder {
    const content = this.getMessageContent(message);
    const hasGuild = !!message.guild;

    const authorName = hasGuild
      ? `${message.guild?.name || "Desconhecido"} > ${
          message.guild?.channels.cache.get(message.channelId)?.name ||
          "Desconhecido"
        }`
      : isDM
        ? `${message.author?.username || "Desconhecido"} > DM`
        : `Servidor Privado > ${message.author?.username || "Desconhecido"}`;

    const authorIconURL = hasGuild
      ? message.guild?.iconURL() || ""
      : message.author?.displayAvatarURL?.() || "";

    return new EmbedBuilder()
      .setColor("Purple")
      .setAuthor({ name: authorName, iconURL: authorIconURL })
      .setDescription(content);
  }

  private getMessageContent(
    message: Message<boolean> | PartialMessage,
  ): string {
    if (message.content?.trim()) {
      return message.content;
    }

    if (message.attachments.size > 0) {
      return [...message.attachments.values()].map((a) => a.url).join("\n");
    }

    return "*[Mensagem sem conteúdo]*";
  }
}

export const sendSavedToDMService = new SendSavedToDMService();

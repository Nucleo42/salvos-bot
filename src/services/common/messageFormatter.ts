import { Message, PartialMessage } from "discord.js";

export interface FormattedMessageData {
  content: string;
  authorName: string;
  authorIconURL: string;
  tags?: string;
  messageLink: string | null;
}

class MessageFormatter {
  public formatMessageData(
    message: Message | PartialMessage,
    isDM: boolean,
    tags?: string,
    guildId?: string | null,
  ): FormattedMessageData {
    const content = this.getMessageContent(message);
    const messageLink = this.getMessageLink(
      message as Message<boolean>,
      isDM,
      guildId,
    );
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

    return {
      content,
      authorName,
      authorIconURL,
      tags,
      messageLink,
    };
  }

  private getMessageContent(message: Message | PartialMessage): string {
    if (message.content?.trim()) {
      return message.content;
    }

    if (message.attachments?.size > 0) {
      return [...message.attachments.values()].map((a) => a.url).join("\n");
    }

    return "*[Mensagem sem conteúdo]*";
  }

  private getMessageLink(
    message: Message<boolean>,
    isDM: boolean,
    guildId: string | null | undefined,
  ): string | null {
    const hasGuild = guildId || message.guild?.id;

    if (isDM || !hasGuild) return null;
    return `https://discord.com/channels/${hasGuild}/${message.channelId}/${message.id}`;
  }
}

export const messageFormatter = new MessageFormatter();

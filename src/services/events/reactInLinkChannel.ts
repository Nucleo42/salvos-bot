import { Message, OmitPartialGroupDMChannel } from "discord.js";
import configs from "@configs/channels";

const { linksChannel } = configs;

class ReactInLinkChannelService {
  public async react(interaction: OmitPartialGroupDMChannel<Message<boolean>>) {
    const channelID = interaction.channelId;

    if (linksChannel !== channelID) return;

    await interaction.react("⭐");
  }
}

export const reactInLinkChannelService = new ReactInLinkChannelService();

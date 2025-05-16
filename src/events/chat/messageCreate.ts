import { Event } from "@interfaces/events";
import { reactInLinkChannelService } from "@services/events/reactInLinkChannel";

export default new Event({
  name: "messageCreate",
  execute: async (interaction) => {
    if (interaction.author?.bot) return;

    await reactInLinkChannelService.react(interaction);
  },
});

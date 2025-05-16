import { Event } from "@interfaces/events";
import { starReactionService } from "@services/events/starReaction";

export default new Event({
  name: "messageReactionAdd",
  execute: async (interaction, user) => {
    if (user.bot) return;
    if (!interaction.emoji) return;

    if (interaction.emoji.name == "⭐") {
      starReactionService.handleReaction(interaction, user);
    }
  },
});

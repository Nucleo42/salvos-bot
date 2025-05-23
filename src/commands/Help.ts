import { Command } from "@interfaces/commands";
import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord.js";
import { helpService } from "@services/commands/helpService";

export default new Command({
  name: "help",
  description: "Entenda como usar o app/bot",
  type: ApplicationCommandType.ChatInput,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM],
  integrationTypes: [
    ApplicationIntegrationType.UserInstall,
    ApplicationIntegrationType.GuildInstall,
  ],
  execute: async ({ interaction }) => {
    helpService.execute(interaction);
  },
});

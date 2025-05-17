import { Command } from "@interfaces/commands";
import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord.js";
import { cleanChatService } from "@services/commands/CleanChatService";

export default new Command({
  name: "clean-chat",
  description: "Limpa o chat",
  type: ApplicationCommandType.ChatInput,
  contexts: [InteractionContextType.BotDM],
  integrationTypes: [ApplicationIntegrationType.UserInstall],
  execute: async ({ interaction }) => {
    await cleanChatService.execute(interaction);
  },
});

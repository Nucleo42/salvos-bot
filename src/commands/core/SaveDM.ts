import { Command } from "@interfaces/commands";
import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord.js";

import { saveDMService } from "@services/commands/saveDMService";

export default new Command({
  name: "Salvar Na DM",
  type: ApplicationCommandType.Message,
  contexts: [
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
  ],
  integrationTypes: [
    ApplicationIntegrationType.UserInstall,
    ApplicationIntegrationType.GuildInstall,
  ],
  execute: async ({ interaction }) => {
    await saveDMService.save(interaction);
  },
});

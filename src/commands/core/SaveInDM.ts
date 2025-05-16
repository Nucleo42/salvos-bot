import { Command } from "@interfaces/commands";
import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  InteractionContextType,
} from "discord.js";

import { saveInDMService } from "@services/commands/saveInDMService";

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
    await saveInDMService.save(interaction);
  },
});

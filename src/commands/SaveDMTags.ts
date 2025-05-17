import { Command } from "@interfaces/commands";

import {
  ApplicationCommandType,
  ApplicationIntegrationType,
  Collection,
  InteractionContextType,
} from "discord.js";

import { saveDMTagsService } from "@services/commands/SaveDMTagsService";
import { saveDMTagsModalService } from "@services/modals/SaveDMTagsModalService";

export default new Command({
  name: "Salvar Com Tags",
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
    await saveDMTagsService.save(interaction);
  },

  modals: new Collection([
    [
      "save_dm_tags",
      async (interaction) => {
        await saveDMTagsModalService.execute(interaction);
      },
    ],
  ]),
});

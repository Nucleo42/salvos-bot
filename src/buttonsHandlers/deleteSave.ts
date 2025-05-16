import { ButtonHandle } from "@interfaces/buttonHandle";

export default new ButtonHandle({
  name: "delete-save",
  execute: async (interaction) => {
    await interaction.message.delete();
  },
});

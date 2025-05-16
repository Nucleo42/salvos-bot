import { CommandInteraction, EmbedBuilder, MessageFlags } from "discord.js";

class HelpService {
  public async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Como usar o comando de salvar")
      .setDescription("Aqui estão algumas dicas para usar o comando de salvar:")
      .addFields({
        name: "Salvar uma mensagem",
        value: "Clique botão direto** na mensagem > Apps > **Salvar Na DM",
      })
      .addFields({
        name: "Se o bot estiver no servidor",
        value: "**Reaja** com estrela (⭐) em uma mensagem",
      })
      .setFooter({
        text: "criado por @parlandim",
      });

    await interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export const helpService = new HelpService();

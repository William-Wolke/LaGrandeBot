const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("nft")
      .setDescription("Bild."),
    async execute(interaction) {
      await interaction.reply("hej");
    },
  };
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("game")
      .setDescription("Gamin."),
    async execute(interaction) {
      await interaction.reply("hej");
    },
  };
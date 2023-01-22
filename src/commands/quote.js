const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("quote")
      .setDescription("Citera dina favoritcitat."),
    async execute(interaction) {
      await interaction.reply("hej");
    },
  };
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("create")
      .setDescription("Skapa saker."),
    async execute(interaction) {
      await interaction.reply("hej");
    },
  };
  
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const heroes = require("../data/bloons.json");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("bloons")
      .setDescription("Fusty."),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Pat Fusty')
        .setURL('https://statsnite.com/api/btd/v3/hero/pat-fusty')
        .setAuthor({ name: 'Pat Fusty', iconURL: 'https://statsnite.com/images/btd/heroes/pat-fusty/hero.png', url: 'https://statsnite.com/api/btd/v3/hero/pat-fusty' })
        .setDescription('Den bästa hjälten i bloons tower defense 6')
        .setThumbnail('https://statsnite.com/images/btd/heroes/pat-fusty/hero.png')

    interaction.reply({ embeds: [exampleEmbed] });
    },
  };
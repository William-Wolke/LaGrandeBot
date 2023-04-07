const path = require('node:path');
const fs = require('node:fs');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Bild."),
  async execute(interaction) {

    const tempPath = path.join(__dirname, '../../temp/');
    const files = fs.readdirSync(tempPath);
    const row = new ActionRowBuilder()

    files.forEach(file => {
      row.addComponents(
				new ButtonBuilder()
					.setCustomId(file)
					.setLabel(file)
					.setStyle(ButtonStyle.Primary),
			);
    });

		await interaction.reply({ content: 'Images!', components: [row] });
    
  },
};
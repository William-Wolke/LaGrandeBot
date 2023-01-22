const { SlashCommandBuilder } = require("discord.js");
const { AxiosGet } = require('../helpers.js');
const { CreateLeaderBoard } = require('../ListHandler.js');
const paths = require('../data/paths.json');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("leaderboard")
      .setDescription("Get leaderboard."),
    async execute(interaction) {
        try {
            let response = await AxiosGet(process.env.db_url, paths.leaderboardLink);
            console.log(response);
            let list = CreateLeaderBoard(response);
            if (response) return await interaction.reply(`Här är topplistan:\n${list}`);
            throw new Error("Listan är tom?:thinking:");
        } catch (e) {
            console.log(e.message);
            return await interaction.reply(e.message);
        }
    },
  };
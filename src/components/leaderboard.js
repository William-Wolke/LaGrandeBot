const { AxiosGet } = require('../helpers.js');
const { CreateLeaderBoard } = require('../ListHandler.js');
const paths = require('../data/paths.json');
require('dotenv').config();

const leaderboard = async (msg) => {
    try {
        let response = await AxiosGet(process.env.db_url, paths.leaderboardLink);
        console.log(response);
        let list = CreateLeaderBoard(response);
        if (response) return msg.reply(`Här är topplistan:\n${list}`);
        throw new Error("Listan är tom?:thinking:");
    } catch (e) {
        console.log(e.message);
        return msg.reply(e.message);
    }
}

module.exports = { leaderboard }

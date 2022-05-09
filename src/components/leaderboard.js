import { createRequire } from 'module';
import { AxiosGet } from '../components/Tools.js';
import { CreateLeaderBoard } from '../ListHandler.js';
const require = createRequire(import.meta.url);
const config = require('../data/config.json');
require('dotenv').config();

export const LeaderBoard = async (msg) => {
    try {
        let response = await AxiosGet(process.env.db_url, config.leaderboardLink);
        console.log(response);
        let list = CreateLeaderBoard(response);
        if (response) return msg.reply(`Här är topplistan:\n${list}`);
        throw new Error("Listan är tom?:thinking:");
    } catch (e) {
        console.log(e.message);
        return msg.reply(e.message);
    }
}
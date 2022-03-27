import config from './src/data/config.json';
import { CheckCommand } from './src/CommandHandler';
import { KeywordHandler } from './src/KeywordHandler';

// Run dotenv
require('dotenv').config();
const {Client, Intents} = require('discord.js');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

client.on('ready', () => {
    client.user.setStatus('Gaming rn')
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return false;

    if(msg.content.startsWith(config.callName)) {
        CheckCommand(msg);
    }
    else {
        KeywordHandler(msg);
    }
});

client.login(process.env.Discordbot_Token);


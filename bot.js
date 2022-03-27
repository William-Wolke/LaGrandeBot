//import config from ;
import { CheckCommand } from './src/CommandHandler.js';
import { KeywordHandler } from './src/KeywordHandler.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const config = require('./src/data/config.json');

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
        CheckCommand(client, msg);
    }
    else {
        KeywordHandler(client, msg);
    }
});

client.login(process.env.Discordbot_Token);


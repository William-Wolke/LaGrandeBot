import { CreateCommandList } from './ListHandler.js';
import { createRequire } from "module";
import { Games } from './components/games.js';
import { Create } from './components/create.js';
import { LeaderBoard } from './components/leaderboard.js';
import { Quote } from './components/quote.js';
import { Order } from './components/order.js';
import { sendNFT } from './components/Image.js';
const require = createRequire(import.meta.url);

const commands = require('./data/commands.json');
const config = require('./data/config.json');

export const CheckCommand = async (client, msg) => {
    let valid = false;

    if (msg.content === config.callName) return msg.reply(config.introduction);

    valid = commands.map((item) => {
        if (msg.content.toLowerCase().startsWith(config.callName + item)) {
            ExecuteCommand(client, msg, item);
            return true;
        }
    });
    if (valid) return;
    
    msg.reply('Ogiltigt command, skriv !hjälp för psykisk hjälp.');
}

export const ExecuteCommand = async (client, msg, command) => {
    let commandWords = msg.content.split(' ');
    if (command === 'hjälp') {
        let commandList = CreateCommandList(config.callName, commands);
        msg.reply(`Hej ${msg.author.username}, här är alla kommand du söker: \n` + commandList);
    }
    else if (command === 'beställ') return Order(commandWords, msg);
    
    else if (command === 'citat') return Quote(commandWords, client, msg);
    
    else if (command === 'skapa') return Create(commandWords, msg);
    
    else if (command === 'topplista') return LeaderBoard(msg);
    
    else if (command === 'spela') return Games(commandWords, msg);
    
    else if (command === 'nft') return sendNFT(msg, client);
    
}
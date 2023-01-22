const{ createCommandList } = require('./ListHandler.js');
const { games } = require('./components/games.js');
const { create } = require('./components/create.js');
const { leaderboard } = require('./components/leaderboard.js');
const { quote } = require('./components/quote.js');
const { order } = require('./components/order.js');
const { sendNFT } = require('./components/image.js');
const commands = require('./data/commands.json');
const config = require('./data/config.json');

const checkCommand = async (client, msg) => {
    let valid = false;

    if (msg.content === config.callName) return msg.reply(config.introduction);

    valid = commands.map((item) => {
        if (msg.content.toLowerCase().startsWith(config.callName + item)) {
            executeCommand(client, msg, item);
            return true;
        }
    });
    if (valid) return;
    
    msg.reply('Ogiltigt command, skriv !hjälp för psykisk hjälp.');
}

const executeCommand = async (client, msg, command) => {
    let commandWords = msg.content.split(' ');
    if (command === 'hjälp') {
        let commandList = createCommandList(config.callName, commands);
        msg.reply(`Hej ${msg.author.username}, här är alla kommand du söker: \n` + commandList);
    }
    else if (command === 'beställ') return order(commandWords, msg);
    
    else if (command === 'citat') return quote(commandWords, client, msg);
    
    else if (command === 'skapa') return create(commandWords, msg);
    
    else if (command === 'topplista') return leaderboard(msg);
    
    else if (command === 'spela') return games(commandWords, msg);
    
    else if (command === 'nft') return sendNFT(msg, commandWords);
}

module.exports = { checkCommand, executeCommand }
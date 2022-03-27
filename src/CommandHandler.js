import menu from './src/data/menu.json';
import commands from './src/data/commands.json';
import { CreateCommandList, CreateMenuList, GetRandomInt } from './src/ListHandler';

export const CheckCommand = (msg) => {
    let valid = false;

    if (msg.content === config.callName) {
        msg.reply(introduction);
    }
    valid = commands.map((item) => {
        if (msg.content.toLowerCase().startsWith(config.callName + item)) {
            ExecuteCommand(msg, item);
            return true;
        }
    });
    if (!valid) {
        msg.reply('Ogiltigt command, skriv !help för psykisk hjälp.');
    }
}

export const ExecuteCommand = (msg, command) => {
    let commandWords = msg.content.split(' ');
    if (command === 'help') {
        //let helpGreet = `Hej ${msg.author.username}, här är alla kommand du söker: \n`;
        let commandList = CreateCommandList(config.callName, commands);
        msg.reply(`Hej ${msg.author.username}, här är alla kommand du söker: \n` + commandList);
    }
    else if(command === 'beställ') {
        if (commandWords.length === 1) {
            let list = CreateMenuList(menu);
            msg.reply(`Hej här är våran meny: \n ${list}`);
        }
        else if (commandWords[1] === "slump") {
            let order = menu[GetRandomInt(menu.length)];
            msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${order.name}:pizza:`);
        }
        else {
            menu.map((item) => {
                if (commandWords[1].toLowerCase() === item.name.toLocaleLowerCase()) {
                    msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${item.name}:pizza:`);
                }
            })
        }
    }
    else if (command === 'citat') {
        if (commandWords.length === 1) {
            const quoteChannel = client.channels.cache.get("956874968774369280");
            quoteChannel.messages.fetch({ limit: 100 }).then(messages => {
                console.log(`Received ${messages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                let messageArray = [];
                messages.map((item) => {
                    messageArray.push(item);
                });
                let message = messageArray[GetRandomInt(messageArray.length)];
                let quote = message.content;
                msg.reply(`Som en vis person en gång sade:\n${quote}`);
          })
        }
        else if (commandWords[1].startsWith("@")) {
            const quoteChannel = client.channels.cache.get("956874968774369280");
            quoteChannel.messages.fetch({ limit: 100 }).then(messages => {
                console.log(`Received ${messages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                let messageArray = [];
                messages.map((item) => {
                    messageArray.push(item);
                });
                let content = toString(messageArray[0].content);
                console.log(content.Contains(commandWords[1]));
                //let filteredArray = messageArray.filter(item => item.content.contains(commandWords[1]));
                //console.log(filteredArray);

                let message = filteredArray[GetRandomInt(filteredArray.length)];
                let quote = message.content;
                msg.reply(`Som en ${commandWords[1]} en gång sade:\n${quote}`);
            })
        }
        
    }
}
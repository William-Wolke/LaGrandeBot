import { CreateCommandList, CreateMenuList, CreateLeaderBoard, SimpleList, GetRandomInt } from './ListHandler.js';
import { createRequire } from "module";
import { GetCitations, AxiosGet } from './components/Tools.js';
import { AddMoney, FoodTransaction } from './ScoreHandler.js';
import axios from 'axios';
const require = createRequire(import.meta.url);

const commands = require('./data/commands.json');
const config = require('./data/config.json');
const games = require('./data/games.json');
const create = require('./data/create.json');

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
    else if(command === 'beställ') {
        axios.get(new URL(config.menuLink, process.env.db_url).href)
        .then((menu) => {
            if (commandWords.length === 1) {
                let list = CreateMenuList(menu.data);
                msg.reply(`Hej här är våran meny:\n${list}`);
            }
            else if (commandWords[1] === "slump") {
                let order = menu.data[GetRandomInt(menu.data.length)];
                FoodTransaction(msg.author.username, order.price)
                .then((result) => {
                    if (result) {
                        msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${order.name}${order.emoji}`);
                    }
                    else {
                        msg.reply(`Hej ${msg.author.username}, här kommer ... inget, för William har gjort fel.`);
                    }
                });
            }
            else {
                let orderName = "";
                commandWords.map((item, index) => {
                    if (index !== 0) {
                        if (index === commandWords.length - 1) {
                            orderName += item;
                        }
                        else {
                            orderName += item + " ";
                        }
                    }
                });
                menu.data.map((item) => {
                    if (orderName.toLowerCase() === item.name.toLocaleLowerCase()) {
                        FoodTransaction(msg.author.username, item.price)
                        .then((result) => {
                            if (result) {
                                msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${item.name}${item.emoji}`);
                            }
                            else {
                                msg.reply(`Hej ${msg.author.username}, här kommer ... inget, för William har gjort fel.`);
                            }
                        });
                    }
                });
            }
        })
        .catch((error) => {
            msg.reply("William har gjort fel");
            console.error(error);
        });
    }
    else if (command === 'citat') {
        if (commandWords.length === 1) {
            const quoteChannel = client.channels.cache.get("694162172351348736");
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
        else if (commandWords[1].startsWith("<@")) {
            const quoteChannel = client.channels.cache.get("694162172351348736");
            quoteChannel.messages.fetch({ limit: 100 }).then(messages => {
                console.log(messages);
                console.log(`Received ${messages.size} messages`);
                //Iterate through the messages here with the variable "messages".
                let messageArray = [];
                messages.map((item) => {
                    messageArray.push(item);
                });

                let messagesWithPerson = messageArray.filter(item => item.mentions.users.first() === commandWords[1]);
                console.log(messagesWithPerson);
                
                let message = messagesWithPerson[GetRandomInt(messagesWithPerson.length)];

                let quote = message.content;
                msg.reply(`Som en ${commandWords[1]} en gång sade:\n${quote}`);
            })
        }
        
    }
    else if (command === 'skapa') {
        // !skapa
        if (commandWords.length === 1) {
            let list = SimpleList(create, "name");
            msg.reply(`Dessa saker kan du skapa:\n${list}`);
        }
        // !skapa <item>
        else if (commandWords.length === 2) {
            let valid = false;
            valid = create.map((item) => {
                if (commandWords[1] === item.name) {
                    msg.reply(`${item.response}`);
                    return true
                }
            });
            if (!valid) return msg.reply(`Du kan inte skapa: ${commandWords[1]}`);
        }
        else if (commandWords[1] === "meny" && commandWords.length >= 5) {

            let formData = new URLSearchParams();
            GetCitations(commandWords)
            .then(({ name, ending}) => {
                formData.append('name', name);
                formData.append('price', commandWords[ending + 1]);
                formData.append('currency', commandWords[ending + 2]);
                formData.append('emoji', commandWords[ending + 3]);
                
                axios.post(new URL(config.createMenuItemLink, process.env.db_url).href, formData)
                .then(() => {
                    return msg.reply("Skapad, smaklig måltid :yum:")
                })
                .catch((error) => {
                    console.error(error);
                    return msg.reply("William har gjort fel");
                });
            });
        }
        else if (commandWords[1] === "person" && commandWords[2] === "jag") {
            let formData = new URLSearchParams();

            formData.append("name", msg.author.username);
            formData.append("money", config.userStartSum);
            formData.append("bought", 0);
            formData.append("spent", 0);

            axios.post(new URL(config.createPersonLink, process.env.db_url).href, formData)
            .then((res) => {
                msg.reply("Du är skapad :pray:");
            })
            .catch(() => {
                msg.reply("William har gjort fel... igen :pensive: :skull:")
            });
        }
        else if (commandWords[1] === 'nyckelord' && commandWords.length === 4) {
            let callBack = commandWords.filter((item, index) => index >= 3).join(" "); 
            let formData = new URLSearchParams();
            console.log(commandWords[2], callBack);
            formData.append("keyword", commandWords[2]);
            formData.append("callBack", callBack);

            axios.post(new URL(config.createKeywordLink, process.env.db_url).href, formData)
            .then((response) => {
                return msg.reply("Nyckelord skapat");
            })
            .catch((error) => {
                console.error(error);
                return msg.reply("William har gjort fel... igen :pensive: :skull:... igen :coolsol:");
            });
        }
    }
    else if (command === 'topplista') {
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
    else if (command === 'spela') {
        if (commandWords.length === 1) {
            let list = SimpleList(games, 'name');
            return msg.reply(`Spellistan:\n${list}`);
        }
        else if (commandWords[1] === 'bloons') {
            if (commandWords.length === 2) {
                let list = SimpleList(games[0].heroes, 'name');
                return msg.reply(`Du vill spela bloons på lektions/arbetstid bra val\nDe här hjältarna finns det skriv deras namn efter ${config.callName}spela bloons\n${list}`);
            }
            else if (commandWords.length === 3) {
                games[0].heroes.map((hero) => {
                    if (commandWords[2].toLowerCase() === hero.name) {
                        let outcome = hero.outcomes[GetRandomInt(hero.outcomes.length)];

                        AddMoney(msg.author.username, outcome.value)
                        .then((result) => {
                            console.log(result);
                            if (result) {
                                return msg.reply(`${hero.message}\n${outcome.message}\nDu tjänade: ${outcome.value}kr`);
                            }
                            else {
                                return msg.reply(`${hero.message}\n${outcome.message}\nDu tjänade: inga pengar för något gick fel`);
                            }
                        });
                    }
                })
            }
        }
        else if (commandWords[1] === 'countersnipe') {

        }
    }
}
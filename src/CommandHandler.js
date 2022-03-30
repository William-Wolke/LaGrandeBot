// import menu from './src/data/menu.json';
// import commands from './src/data/commands.json';
import { CreateCommandList, CreateMenuList, CreateLeaderBoard, SimpleList, GetRandomInt } from './ListHandler.js';
import { createRequire } from "module";
import axios from 'axios';
import cors from 'cors';
const require = createRequire(import.meta.url);

//const menu = require('./data/menu.json');
const commands = require('./data/commands.json');
const config = require('./data/config.json');
const games = require('./data/games.json');

export const CheckCommand = (client, msg) => {
    let valid = false;

    if (msg.content === config.callName) {
        msg.reply(config.introduction);
    }
    valid = commands.map((item) => {
        if (msg.content.toLowerCase().startsWith(config.callName + item)) {
            ExecuteCommand(client, msg, item);
            return true;
        }
    });
    if (!valid) {
        msg.reply('Ogiltigt command, skriv !hjälp för psykisk hjälp.');
    }
}

export const ExecuteCommand = (client, msg, command) => {
    let commandWords = msg.content.split(' ');
    if (command === 'hjälp') {
        let commandList = CreateCommandList(config.callName, commands);
        msg.reply(`Hej ${msg.author.username}, här är alla kommand du söker: \n` + commandList);
    }
    else if(command === 'beställ') {
        axios.get("http://192.168.0.122:8000/menu")
        .then((menu) => {
            console.log(menu.data);
            if (commandWords.length === 1) {
                let list = CreateMenuList(menu.data);
                msg.reply(`Hej här är våran meny:\n${list}`);
            }
            else if (commandWords[1] === "slump") {
                let order = menu.data[GetRandomInt(menu.data.length)];
                msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${order.name}${order.emoji}`);
            }
            else {
                console.log("extra speciale");
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
                        msg.reply(`Hej ${msg.author.username}, här kommer en rykande färsk ${item.name}${item.emoji}`);
                    }
                })
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
        if (commandWords.length === 1) {
            msg.reply("Skriv såhär för att skapa\n!skapa <vilken lista tex: meny> <pris> <valuta> <emoji> <namn, kan vara hur många ord som helst>")
        }
        else if (commandWords[1] === "meny") {

            let formData = new URLSearchParams();
            let name = commandWords.filter((item, index) => index >= 5).join(" ");
            
            formData.append('name', name);
            formData.append('price', commandWords[2]);
            formData.append('currency', commandWords[3]);
            formData.append('emoji', commandWords[4]);
            
            axios.post("http://192.168.0.122:8000/createMenuItem", formData)
            .then(() => {
               msg.reply("Skapad, smaklig måltid :yum:")
            })
            .catch((error) => {
                msg.reply("William har gjort fel");
                console.error(error);
            });
        }
        else if (commandWords[1] === "person") {
            let formData = new URLSearchParams();

            formData.append("name", msg.author.username);
            formData.append("money", 500);
            formData.append("amountBought", 0);
            formData.append("priceBought", 0);

            axios.post("http://192.168.0.122:8000/createPerson", formData)
            .then((res) => {
                msg.reply("Du är skapad :pray:");
            })
            .catch(() => {
                msg.reply("William har gjort fel... igen :pensive: :skull:")
            });
        }
        else if (commandWords[1] === 'nyckelord') {
            let callBack = commandWords.filter((item, index) => index >= 3).join(" "); 
            let formData = new URLSearchParams();
            console.log(commandWords[2], callBack);
            formData.append("keyword", commandWords[2]);
            formData.append("callBack", callBack);

            axios.post("http://192.168.0.122:8000/createKeyword", formData)
            .then((response) => {
                msg.reply("Nyckelord skapat");
            })
            .catch((error) => {
                msg.reply("William har gjort fel... igen :pensive: :skull:... igen :coolsol:");
                console.error(error);
            });
        }
    }
    else if (command === 'topplista') {
        axios.get("http://192.168.0.122:8000/leaderboard")
        .then((response) => {
            console.log(response.data);
            let list = CreateLeaderBoard(response.data);
            msg.reply(`Här är topplistan:\n${list}`);
        })
        .catch(() => {

        });
    }
    else if (command === 'spela') {
        if (commandWords.length === 1) {
            let list = SimpleList(games, 'name');
            msg.reply(`Spellistan:\n${list}`);
        }
        else if (commandWords[1] === 'bloons') {
            if (commandWords.length === 2) {
                let list = SimpleList(games[0].heroes, 'name');
                msg.reply(`Du vill spela bloons på lektions/arbetstid bra val\nDe här hjältarna finns det skriv deras namn efter ${config.callName}spela bloons\n${list}`);
            }
            else if (commandWords.length === 3) {
                games[0].heroes.map((hero) => {
                    console.log()
                    if (commandWords[2].toLowerCase() === hero.name) {
                        msg.reply(`${hero.message}`);
                    }
                })
            }
        }
        else if (commandWords[1] === 'countersnipe') {

        }
    }
}
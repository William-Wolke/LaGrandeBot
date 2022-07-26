import axios from "axios";
import { createRequire } from 'module';
import { FoodTransaction } from "../ScoreHandler.js";
import { GetRandomInt, CreateMenuList } from "../ListHandler.js";
const require = createRequire(import.meta.url);
const paths = require('../data/paths.json');
require('dotenv').config();

export const Order = (commandWords, msg) => {
    axios.get(new URL(paths.menuLink, process.env.db_url).href)
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
import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('./data/config.json');


export const KeywordHandler = (client, msg) => {
    axios.get(new URL(config.keywordLink, process.env.db_url).href)
    .then(response => {
        let words = msg.content.split(" ");
        response.data.map((item) => {
            words.map((word) => {
                if (word.toLowerCase() === item.name) {
                    msg.reply(item.callBack);
                    return;
                }
            });
        });
    });
}
// import keywords from ;
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const keywords = require('./data/keywords.json');

export const KeywordHandler = (client, msg) => {
    keywords.map((item) => {
        if (msg.content === item.keyword) {
            msg.reply(item.callBack);
            return;
        }
    });
}
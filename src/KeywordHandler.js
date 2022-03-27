import keywords from './src/data/keywords.json';

export const KeywordHandler = (msg) => {
    keywords.map((item) => {
        if (msg.content === item.keyword) {
            msg.reply(item.callBack);
            return;
        }
    });
}
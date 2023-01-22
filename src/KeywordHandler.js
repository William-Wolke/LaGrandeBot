const axios = require("axios");
const paths = require('./data/paths.json');

const keywordHandler = (client, msg) => {
    axios.get(new URL(paths.keywordLink, process.env.db_url).href)
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

module.exports = { keywordHandler }

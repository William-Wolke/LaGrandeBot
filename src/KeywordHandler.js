import axios from "axios";

export const KeywordHandler = (client, msg) => {
    axios.get("http://192.168.0.122:8000/keywords")
    .then(response => {
        let words = msg.content.split(" ");
        response.data.map((item) => {
            words.map((word) => {
                if (word.toLowerCase() === item.keyword) {
                    msg.reply(item.callBack);
                    return;
                }
            });
        });
    });
}
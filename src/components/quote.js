const { GetRandomInt } = require('../ListHandler.js');

const quote = async (commandWords, client, msg) => {
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
            return msg.reply(`Som en vis person en gång sade:\n${quote}`);
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
            return msg.reply(`Som en ${commandWords[1]} en gång sade:\n${quote}`);
        })
    }
}

module.exports = { quote };
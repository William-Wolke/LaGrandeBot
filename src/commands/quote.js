const { SlashCommandBuilder } = require("discord.js");
const { getRandomInt } = require("../helpers.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("quote")
      .setDescription("Citera dina favoritcitat."),
    async execute(interaction) {
      await interaction.deferReply();
      const quoteChannel = interaction.client.channels.cache.get("694162172351348736");
        quoteChannel.messages.fetch({ limit: 100 }).then(messages => {
            console.log(`Received ${messages.size} messages`);

            let messageArray = [];
            messages.map((item) => {
                messageArray.push(item);
            });
            let message = messageArray[getRandomInt(messageArray.length)];
            console.log(message)

            let quote = message.content;
            return interaction.editReply(`Som en vis person en gång sade:\n${quote}`);
        })
    },
  };
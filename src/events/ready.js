const { Events } = require('discord.js');
const config = require('../data/config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity(config.activity, { type: config.activityType });
        console.log(`Logged in as ${client.user.tag}!`);
    }
};

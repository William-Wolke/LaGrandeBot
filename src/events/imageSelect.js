const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {
        if (!interaction.isButton()) return;
        console.log(interaction);

        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async i => {
            await i.update({ content: 'A button was clicked!', components: [] });
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    }
};


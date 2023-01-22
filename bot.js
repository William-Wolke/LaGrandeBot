const { checkCommand } = require('./src/CommandHandler.js');
const { keywordHandler } = require('./src/KeywordHandler.js');
const config = require('./src/data/config.json');
const path = require('node:path');
const fs = require('node:fs');

require('dotenv').config();
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent,
        // GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions
    ] 
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
        console.log(command.data.name)
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.ClientReady, () => {
    client.user.setActivity(config.activity, {type: config.activityType});
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

// client.on(Events.MessageCreate, async (msg) => {
//     if (msg.author.bot) return false;

//     else if(msg.content.startsWith(config.callName)) {
//         checkCommand(client, msg);
//     }
//     else {
//         keywordHandler(client, msg);
//     }
//     console.log(msg.content)
// });

client.login(process.env.Discordbot_Token);


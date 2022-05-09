import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { MessageAttachment } = require('discord.js');

export const sendNFT = (msg, client) => {
    const attachment = new MessageAttachment('nft/cool_sol_1.png');
    const channel = client.channels.cache.get(msg.channelId);

    channel.send("hej", { files: [attachment]});
}
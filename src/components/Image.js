import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require('node:path');
const axios = require('axios');
const fs = require('fs');
const { MessageAttachment, MessageEmbed } = require("discord.js");
const config = require('../data/config.json');

export const sendNFT = async (msg, commandWords) => {
    if (commandWords.length === 2) {
        try {
        let url = new URL(config.getNFT + commandWords[1], process.env.db_url)
            .href;
        let filePath = path.join(process.env.temp_path, commandWords[1]);
        console.log(url);

        const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
        });

        new Promise((resolve, reject) => {
            response.data
            .pipe(fs.createWriteStream(filePath))
            .on("error", reject)
            .once("close", () => resolve(filePath));

            const file = new MessageAttachment(filePath);
            const exampleEmbed = new MessageEmbed().setTitle(commandWords[1]);

            msg.reply({ embeds: [exampleEmbed], files: [file] });

            fs.unlink(filePath, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("Bilden borttagen");
            });
        });

        //     let img = await axios.get(url);
        //     let attachment = new MessageAttachment(img.data, commandWords[1]);
        //     let response = await msg.reply({ files: [attachment] });
        //     console.log(response);
        } catch (e) {
            console.log(e.message);
        }
    }
};

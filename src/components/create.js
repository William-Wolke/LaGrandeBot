import { createRequire } from 'module';
import { GetCitations } from '../components/Tools.js';
import axios from 'axios';
const require = createRequire(import.meta.url);
const create = require('../data/create.json');
const config = require('../data/config.json');
const paths = require('../data/paths.json');

export const Create = async (commandWords, msg) => {
    // !skapa
    if (commandWords.length === 1) {
        let list = SimpleList(create, "name");
        msg.reply(`Dessa saker kan du skapa:\n${list}`);
    }
    // !skapa <item>
    else if (commandWords.length === 2) {
        let valid = false;
        valid = create.map((item) => {
            if (commandWords[1] === item.name) {
                msg.reply(`${item.response}`);
                return true
            }
        });
        if (!valid) return msg.reply(`Du kan inte skapa: ${commandWords[1]}`);
    }
    else if (commandWords[1] === "meny" && commandWords.length >= 5) {

        let formData = new URLSearchParams();
        GetCitations(commandWords)
        .then(({ name, ending}) => {
            formData.append('name', name);
            formData.append('price', commandWords[ending + 1]);
            formData.append('currency', commandWords[ending + 2]);
            formData.append('emoji', commandWords[ending + 3]);
            
            axios.post(new URL(paths.createMenuItemLink, process.env.db_url).href, formData)
            .then(() => {
                return msg.reply("Skapad, smaklig måltid :yum:")
            })
            .catch((error) => {
                console.error(error);
                return msg.reply("William har gjort fel");
            });
        });
    }
    else if (commandWords[1] === "person" && commandWords[2] === "jag") {
        let formData = new URLSearchParams();

        formData.append("name", msg.author.username);
        formData.append("money", config.userStartSum);
        formData.append("bought", 0);
        formData.append("spent", 0);

        axios.post(new URL(paths.createPersonLink, process.env.db_url).href, formData)
        .then((res) => {
            msg.reply("Du är skapad :pray:");
        })
        .catch(() => {
            msg.reply("William har gjort fel... igen :pensive: :skull:")
        });
    }
    else if (commandWords[1] === 'nyckelord' && commandWords.length === 4) {
        let callBack = commandWords.filter((item, index) => index >= 3).join(" "); 
        let formData = new URLSearchParams();
        console.log(commandWords[2], callBack);
        formData.append("keyword", commandWords[2]);
        formData.append("callBack", callBack);

        axios.post(new URL(paths.createKeywordLink, process.env.db_url).href, formData)
        .then((response) => {
            return msg.reply("Nyckelord skapat");
        })
        .catch((error) => {
            console.error(error);
            return msg.reply("William har gjort fel... igen :pensive: :skull:... igen :coolsol:");
        });
    }
    else if (commandWords[1] === 'nft' && commandWords[2]) {

        if (commandWords[2].endsWith('.jpg') || commandWords[2].endsWith('.png') || commandWords[2].endsWith('.jpeg')) {
            try {
                let formData = new URLSearchParams();
                formData.append("url", msg.attachments.first()?.url);
                formData.append("name", commandWords[2]);
                const result = await axios.post(new URL(paths.createNFT, process.env.db_url).href, formData);
            } catch (e) {
                console.error(e.message);
            }
            
        }
    }
}
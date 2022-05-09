import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const games = require('../data/games.json');

export const Games = async (commandWords, msg) => {
    if (commandWords.length === 1) {
        let list = SimpleList(games, 'name');
        return msg.reply(`Spellistan:\n${list}`);
    }
    else if (commandWords[1] === 'bloons') {
        if (commandWords.length === 2) {
            let list = SimpleList(games[0].heroes, 'name');
            return msg.reply(`Du vill spela bloons på lektions/arbetstid bra val\nDe här hjältarna finns det skriv deras namn efter ${config.callName}spela bloons\n${list}`);
        }
        else if (commandWords.length === 3) {
            games[0].heroes.map((hero) => {
                if (commandWords[2].toLowerCase() === hero.name) {
                    let outcome = hero.outcomes[GetRandomInt(hero.outcomes.length)];

                    AddMoney(msg.author.username, outcome.value)
                    .then((result) => {
                        console.log(result);
                        if (result) {
                            return msg.reply(`${hero.message}\n${outcome.message}\nDu tjänade: ${outcome.value}kr`);
                        }
                        else {
                            return msg.reply(`${hero.message}\n${outcome.message}\nDu tjänade: inga pengar för något gick fel`);
                        }
                    });
                }
            })
        }
    }
    else if (commandWords[1] === 'countersnipe') {

    }
}
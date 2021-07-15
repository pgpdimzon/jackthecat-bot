module.exports = {
    name: 'wisdom',
    description: 'get a random quote from pool of server quotes',
    async execute(message, args) {

        const Quote = require('../models/quotes');

        let idList = [];

        if(!args.length) {

            const item = await Quote.find({ server_id : message.guild.id });

            if(item[0] == null) {
                message.channel.send('No wisdom found. Add a quote first.');
            }

            item.forEach((i) => {
                idList.push(i.id);
            });

            const num = getRandomIntInclusive(0, idList.length - 1);
            const itemId = idList[num];

            const quoteObj = item.filter((i) => {
                return i.id == itemId;
            });

            message.channel.send(quoteObj[0].body + ' - ' + `<@!${quoteObj[0].user_tagged}>` + ', ' + quoteObj[0].creation_year);

        }
        else {
            const taggedUser = message.mentions.users.first().id;
            const item = await Quote.find({ server_id : message.guild.id, user_tagged : taggedUser });

            if(item[0] == null) {
                message.channel.send('This person does not have wisdom... yet.');
            }

            item.forEach((i) => {
                idList.push(i.id);
            });

            const num = getRandomIntInclusive(0, idList.length - 1);
            const itemId = idList[num];

            const quoteObj = item.filter((i) => {
                return i.id == itemId;
            });

            message.channel.send(quoteObj[0].body + ' - ' + `<@!${quoteObj[0].user_tagged}>` + ', ' + quoteObj[0].creation_year);
        }

    },
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

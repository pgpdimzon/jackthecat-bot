module.exports = {
    name: 'quote',
    description: 'quote a user',
    async execute(message, args) {

        const Quote = require('../models/quotes');

        const date = new Date(message.createdTimestamp);
        let quote;
        const taggedUser = message.mentions.users.first().id;

        args.forEach(element => {
            if(!element.includes('<@!') && !element.includes('<@')) {
               quote = quote == undefined ? element : quote.concat(' ', element);
            }
        });

        if(quote.charAt(0) == '"' && quote.charAt(quote.length - 1) != '"') {
            quote = quote + '"';
        }
        else if (quote.charAt(0) != '"' && quote.charAt(quote.length - 1) == '"') {
            quote = '"' + quote;
        }
        else if (quote.charAt(0) != '"' && quote.charAt(quote.length - 1) != '"') {
            quote = '"' + quote + '"';
        }

        const quoteObj = await Quote.create({
            server_id : message.guild.id,
            user_tagged : taggedUser,
            body : quote,
            creation_year : date.getFullYear(),
            creation_user_id : message.author.id,
        });

        quoteObj.save();

        message.channel.send(quote + ' by ' + `<@!${taggedUser}>` + ' saved.');
    },
};

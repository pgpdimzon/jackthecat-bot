const Quote = require('../models/quotes');

module.exports = {
    name: 'quote',
    description: 'quote a user',
    async execute(message, args) {

        const date = new Date(message.createdTimestamp);
        let quote;
        const taggedUserId = message.mentions.users.first().id;
        const taggedUserTag = message.mentions.users.first().tag;
       
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
            server_name : message.guild.name,
            user_tagged : taggedUserId,
            user_tagged_tag : taggedUserTag,
            body : quote,
            creation_year : date.getFullYear(),
            creation_fulldate : date,
            creation_user_id : message.author.id,
            creation_user_tag : message.author.tag,
        });

        quoteObj.save();

        message.channel.send(quote + ' by ' + `<@!${taggedUserId}>` + ' saved.');
    },
};

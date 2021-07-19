module.exports = {
    name: 'poll',
    description: 'quick/small poll for the server',
    execute(message, args) {

        if(!args.length) {
            return message.reply('set a poll question pls 😭');
        }

        const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        let pollString = '';
        let multiOptions = false;
        let numOfReactions;

        if(!isNaN(parseInt(args[0])) && parseInt(args[0]) > 1) {
            if(parseInt(args[0]) > 10) {
                message.reply('upto 10 options only pls 😸');
                return;
            }

            multiOptions = true;
            numOfReactions = parseInt(args[0]);

            args.splice(0, 1);
            const choicesString = args.join().replace(/,/g, ' ');
            const choices = choicesString.split('/');

            for(let i = 0; i < choices.length; i++) {
                pollString = pollString.concat(`${reactions[i]} ${choices[i].trim()} \n`);
            }
        }
        else {
            if(parseInt(args[0]) === 0) {
                message.reply('you can\'t have 0 options for the poll 😿');
                return;
            }
            else if(parseInt(args[0]) === 1) {
                message.reply('why bother making a poll with only 1 option? 😾');
                return;
            }
            pollString = args.join().replace(/,/g, ' ');
        }

        const pollQuestion = {
            title: `${message.author.username} asks:`,
            description: `${pollString}`,
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
                icon_url: `${message.author.avatarURL('webp', false, 16)}`,
             },
        };

        if(multiOptions) {
            message.channel.send({ embed: pollQuestion })
                .then(sentMessage => multipleReactions(sentMessage, reactions, numOfReactions));
        }
        else {
            message.channel.send({ embed: pollQuestion })
                .then(sentMessage => defaultReactions(sentMessage));
        }
    },
};

async function defaultReactions(message) {
    message.react('✅');
    message.react('❌');
    message.react('🤔');
}

async function multipleReactions(message, reactions, numberOfReactions) {
    for(let i = 0; i < numberOfReactions; i++) {
        message.react(reactions[i]);
    }
}
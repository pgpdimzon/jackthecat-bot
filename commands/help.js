const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays the available commands',
    execute(message) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#c2924b') 
            .setAuthor('Drunk Jack', 'https://media.giphy.com/media/bHqR2XCmMogDUJmlYK/giphy.gif', 'https://jackthecat-bot.carrd.co')
            .setDescription('Drunk Jack is a virtual cat with an array of awesome commands')
            .addFields(
                { name: 'Commands', value: '`quote` | `wisdom` | `poll` | `randompick` \n`rng` | `flipcoin` | `howto` | `help` \nA full list of commands is available [here](https://jackthecat-bot.carrd.co/#commands)' },
                { name: 'Invite to your server', value: 'Get your server its own virtual drunk cat! [Send an invite!](https://bit.ly/3rfW9RN)' },
                // https://discord.com/oauth2/authorize?client_id=788380059610251274&permissions=3136&scope=bot
                { name: 'Website', value: 'Visit Jack\'s [website](https://jackthecat-bot.carrd.co/)' },
                { name: 'Donate', value: 'Buy Jack a round of drinks [here](https://ko-fi.com/cessie/)' },
            )
            .setFooter('Made by: pbrie#6577');

        message.channel.send(helpEmbed);
    },
};
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays the available commands',
    execute(message) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#c2924b')
            // 'https://i.imgur.com/Dm3umVs.png' 
            .setAuthor('JACK the server cat', 'https://media.giphy.com/media/bHqR2XCmMogDUJmlYK/giphy.gif', 'https://jackthecat-bot.carrd.co')
            .setDescription('Jack is a virtual cat with an array of awesome commands')
            .addFields(
                // { name: 'Commands', value: '`wisdom`, `quote`, `rng`, `flipcoin`, `randompick`, `poll`, `howto`, `help` \nA full list of commands is available [here](https://jackthecat-bot.carrd.co/#commands)' },
                { name: 'Commands', value: '`quote`, `wisdom`, `poll`, `rng`, `flipcoin`, `randompick`, `howto`, `help` \nA full list of commands is available [here](https://jackthecat-bot.carrd.co/#commands)' },
                { name: 'Invite to your server', value: 'Get your server its own virtual drunk cat! [Send him an invite!](https://bit.ly/3sPeqoe)' },
                // https://discord.com/oauth2/authorize?scope=bot&client_id=788380059610251274
                // https://bit.ly/3sPeqoe
                { name: 'Website', value: 'Visit Jack\'s [website](https://jackthecat-bot.carrd.co/)' },
                { name: 'Donate', value: 'Buy Jack a beer bucket [here](https://ko-fi.com/pbrie/)' },
            )
            .setFooter('Made by: pbrie#6577');

        message.channel.send(helpEmbed);
    },
};
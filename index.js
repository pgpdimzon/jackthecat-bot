require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const mongoose = require('mongoose');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

mongoose.connect(process.env.mongodb_srv, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify : false,
}).then(() => {
    console.log('Drunk Jack Connected to DB server');
}).catch((err) => {
    console.log(err);
});

client.once('ready', () => {
    client.user.setActivity('cries for >help', { type: 'LISTENING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);

    console.log('Drunk Jack Ready!');
});

client.on('message', message => {

    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(message.author + ' messaged: ' + message.content);
    console.log(`Command: ${command}`);
    console.log(`Args: ${args}`);

    try {
        if(command == 'ping') {
            client.commands.get(command).execute(client, message, args);
        }
        else {
            client.commands.get(command).execute(message, args);
        }
    }
    catch (error) {
        console.error(error);
        message.channel.send('command not found');
    }
});

client.login(process.env.token);
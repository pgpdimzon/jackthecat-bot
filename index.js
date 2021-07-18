require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');

// const { token, prefix, mongodb_srv } = require('./configurations/config.json');
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
    console.log('Connected to server');
}).catch((err) => {
    console.log(err);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('ready', () => {
    client.user.setActivity('cries for >help', {
        type: 'LISTENING',
    });
});

client.on('message', message => {

    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(message.author + ' messaged: ' + message.content);
    console.log(`Command: ${command}`);
    console.log(`Args: ${args}`);

    try {
        if(command != 'ping') {
            client.commands.get(command).execute(message, args);
        }
        else {
            client.commands.get(command).execute(message, client, args);
        }
    }
    catch (error) {
        console.error(error);
        message.channel.send('command not found');
    }
    // const taggedUser = message.mentions.users.first();
    // message.channel.send(`You wanted to kick: <@!${taggedUser.id}>`);
});

client.login(process.env.token);
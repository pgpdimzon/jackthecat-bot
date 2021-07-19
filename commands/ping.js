module.exports = {
    name: 'ping',
    description: 'get pong',
    execute(client, message, args) {
        message.channel.send('Loading data...').then(async (msg) =>{
            msg.delete();
            message.channel.send(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI Latency: ${Math.round(client.ws.ping)}ms`);
        });
    },
};
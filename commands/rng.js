module.exports = {
    name: 'rng',
    description: 'all rng functions',
    execute(message, sides) {
        const numOfSides = parseInt(sides);

        if(isNaN(numOfSides)) {
            message.channel.send('Invalid number of sides!');
        }
        else {
            console.log(numOfSides);
            const randomNumber = getRandomIntInclusive(1, numOfSides);
            message.channel.send(`🎲ฅ(ﾐዎ ﻌ ዎﾐ)∫ <@!${message.author.id}> rolled **${randomNumber}**`);
        }
    },
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
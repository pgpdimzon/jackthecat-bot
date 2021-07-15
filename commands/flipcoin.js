module.exports = {
    name: 'flipcoin',
    description: 'flip a coin binary heads or tails',
    execute(message, args) {
        const flip = (Math.floor(Math.random() * 2) == 0) ? '⑩ฅ(ﾐዎ ﻌ ዎﾐ)∫ heads' : '⑩ฅ(ﾐዎ ﻌ ዎﾐ)∫ tails';
        message.channel.send(flip);
    },
};
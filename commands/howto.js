module.exports = {
    name: 'howto',
    description: 'returns text how to use a certain command',
    async execute(message, args) {

        const commandGuide = '[full command guide](https://jackthecat-bot.carrd.co/#commands)';

        const Commands = {
            WISDOM: 'wisdom \nwisdom @[user]',
            QUOTE: 'quote [quote] @[user]',
            RNG: 'rng [max number]',
            RANDOMPICK: 'randompick [voice channel id] [number of users] \nrandompick [voice channel name] [number of users]',
            FLIPCOIN: 'flipcoin',
            POLL: 'poll [question]\npoll [number of choices] [choice 1/choice 2/choice ...]',
            HELP: 'help',
            HOWTO: 'howto [command]',
        };

        let commandAsked = null;
        let howToReply = null;

        switch(args[0]) {
            case 'wisdom':
                commandAsked = Commands.WISDOM;
                break;
            case 'quote':
                commandAsked = Commands.QUOTE;
                break;
            case 'rng':
                commandAsked = Commands.RNG;
                break;
            case 'randompick':
                commandAsked = Commands.RANDOMPICK;
                break;
            case 'flipcoin':
                commandAsked = Commands.FLIPCOIN;
                break;
            case 'poll':
                commandAsked = Commands.POLL;
                break;
            case 'help':
                commandAsked = Commands.HELP;
                break;
            case 'howto':
                commandAsked = Commands.HOWTO;
                break;
            default:
                break;
        }

        if(commandAsked == null && args.length > 0) {
            howToReply = {
                fields:[
                    { name: `Command '${args[0]}' not found`,
                      value: `for a full list of commands ➡ ${commandGuide}` },
                ],
            };
        }
        else if (commandAsked == null) {
            args[0] = 'howto';
            commandAsked = Commands.HOWTO;
            howToReply = {
                fields:[
                    { name: `To use command '${args[0]}':`,
                      value: `${commandAsked} \n ${commandGuide}` },
                ],
            };
        }
        else {
            howToReply = {
                fields:[
                    { name: `To use command '${args[0]}':`,
                      value: `${commandAsked} \n ${commandGuide}` },
                ],
            };
        }
        message.channel.send({ embed:howToReply });
    },
};
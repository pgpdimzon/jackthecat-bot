module.exports = {
    name: 'randompick',
    description: 'pick random x number of people currently in a voice channel',
    async execute(message, args) {

        if(!args.length) {
            return message.reply('randompick where? 😿');
        }

        let userList = [];
        let voiceChannelName;
        let isChannelId;

        const channelArray = args.slice(0, args.length - 1);

        if(channelArray.length === 1) {
            isChannelId = !isNaN(parseInt(channelArray[0])) ? true : false;
            voiceChannelName = isChannelId == false ? channelArray.join().replace(/,/g, ' ') : null;
        }
        else {
            isChannelId = false;
            voiceChannelName = channelArray.join().replace(/,/g, ' ');
        }

        let counter = 0;
        if(isChannelId) {
            message.guild.channels.cache.filter((channel) =>
            channel.id === args[0] && channel.guild.name === message.guild.name &&
            channel.type == 'voice').forEach((voiceChannel) => {
                counter++;
                voiceChannelName = voiceChannel.name;
                voiceChannel.members.forEach((member) => {
                    userList.push(member.nickname != null ? member.nickname : member.user.username);
                });
            });
        }
        else {
            message.guild.channels.cache.filter((channel) =>
            channel.name === voiceChannelName && channel.guild.name === message.guild.name &&
            channel.type == 'voice').forEach((voiceChannel) => {
                counter++;
                voiceChannel.members.forEach((member) => {
                    userList.push(member.nickname != null ? member.nickname : member.user.username);
                });
            });
        }

        const numberToPick = args[args.length - 1];
        if(!isNaN(parseInt(numberToPick)) && parseInt(numberToPick) > 0) {
            
            if(!(numberToPick > userList.length)) {
                shuffleArray(userList);
                const randPickEmbed = { title: `Random Pick from ${voiceChannelName}` };

                userList = userList.slice(0, numberToPick);
                const stringUsers = userList.join().replace(/,/g, '\n');

                randPickEmbed.description = stringUsers;
                message.channel.send({ embed : randPickEmbed });
            }
            else {
                let errorMessage;

                if(counter == 0) {
                    errorMessage = 'no voice channel found 🙀';
                }
                else if(userList.length == 0) {
                    errorMessage = 'no users found in voice channel 😿';
                }
                else {
                    errorMessage = 'input exceeded number of users in voice channel 😾';
                }
                message.reply(errorMessage);
            }
        }
        else {
            message.channel.send('cannot pick from invalid number of users 🙀');
        }
    },
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
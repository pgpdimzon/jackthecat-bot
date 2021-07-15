const Feedback = require('../models/feedbacks');

module.exports = {
    name: 'feedback',
    description: 'get feedback from people',
    async execute(message, args) {
        const date = new Date(message.createdTimestamp);
        let feedback;

        args.forEach(element => {
            feedback = feedback == undefined ? element : feedback.concat(' ', element);
        });

        const feedbackObj = await Feedback.create({
            server_id : message.guild.id,
            author_id : message.author.id,
            body : feedback,
            creation_date : date,
        });

        feedbackObj.save();

        message.channel.send('thanks for the feedback!');
    },
};
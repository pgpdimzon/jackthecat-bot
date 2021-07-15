const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbacksSchema = new Schema({

    server_id: {
        type: String,
        required: [true, 'no server id'],
    },
    author_id: {
        type: String,
        required: [true, 'no author'],
    },
    body: {
        type: String,
        require: [true, 'no quote body'],
    },
    creation_date: {
        type: String,
        require: [true, 'no date'],
    },
});

const Feedback = mongoose.model('Feedback', FeedbacksSchema);

module.exports = Feedback;

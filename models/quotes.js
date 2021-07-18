const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotesSchema = new Schema({

    server_id: {
        type: String,
        required: [true, 'no server id'],
    },
    user_tagged: {
        type: String,
        required: [true, 'no user tagged'],
    },
    body: {
        type: String,
        require: [true, 'no quote body'],
    },
    creation_year: {
        type: String,
        require: [true, 'no date'],
    },
    creation_user_id: {
        type: String,
        require: [true, 'no user creation id'],
    },
});

const Quote = mongoose.model('Quote', QuotesSchema);

module.exports = Quote;

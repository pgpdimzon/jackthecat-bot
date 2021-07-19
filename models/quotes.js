const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotesSchema = new Schema({

    server_id: {
        type: String,
        required: [true, 'no server id'],
    },
    server_name: {
        type: String,
        required: [true, 'no server name'],
    },
    user_tagged: {
        type: String,
        required: [true, 'no user tagged id'],
    },
    user_tagged_tag: {
        type: String,
        required: [true, 'no user tagged tag'],
    },
    body: {
        type: String,
        require: [true, 'no quote body'],
    },
    creation_year: {
        type: String,
        require: [true, 'no year'],
    },
    creation_fulldate: {
        type: String,
        require: [true, 'no date'],
    },
    creation_user_id: {
        type: String,
        require: [true, 'no user creation id'],
    },
    creation_user_tag: {
        type: String,
        require: [true, 'no user creation tag'],
    },
});

const Quote = mongoose.model('Quote', QuotesSchema);

module.exports = Quote;

var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var RssData = mongoose.model('RssData', dataSchema);

module.exports = RssData;



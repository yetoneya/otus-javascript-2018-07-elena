var express = require('express');
var app = express();

var Parser = require('rss-parser');
var parser = new Parser();

var mongoose = require('mongoose');

var RssData = require('./schema');
RssData.remove().exec();
mongoose.connect('mongodb://localhost/rssbase', function (err) {
    if (err)
        throw err;

    console.log('Successfully connected');
    (async () => {
        RssData.remove().exec();
        let feed = await parser.parseURL('https://www.reddit.com/.rss');
        feed.items.forEach(item => {
            var data = new RssData({
                _id: new mongoose.Types.ObjectId(),
                title: item.title,
                link: item.link
            });
            data.save(function (err) {
                if (err)
                    throw err;
            });
        });
    })();

    app.get('/data'
            , function (req, res, next) {
                function getRss() {
                    return new Promise(function (resolve, reject) {
                        RssData.find({}, function (err, data) {
                            if (err)
                                reject(err);
                            else
                            {
                                var result = '';
                                data.forEach(function (doc) {
                                    result += '<a href="';
                                    result += doc.link;
                                    result += '">';
                                    result += doc.title;
                                    result += '<a>';
                                    result += '<br>';
                                })
                                resolve(result);
                            }
                        });
                    });
                }
                ;

                getRss().then(data => res.send(data));
            });
    app.listen(3000);
});



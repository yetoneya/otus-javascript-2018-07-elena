var exports = module.exports = {};
var fs = require('fs');

exports.tree = function tree(directory) {
    return new Promise((resolve, reject) => walk(directory, function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        }));

    function walk(dir, done) {
        var results = {
            files: [],
            dirs: []
        };
        fs.readdir(dir, function (err, list) {
            if (err)
                return done(err);
            var pending = list.length;
            if (!pending)
                return done(null, results);
            list.forEach(function (file) {
                file = dir + "/" + file;
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        results.dirs.push(file);
                        walk(file, function (err, res) {
                            results.files = results.files.concat(res.files);
                            results.dirs = results.dirs.concat(res.dirs);
                            if (!--pending)
                                done(null, results);
                        });
                    } else {
                        results.files.push(file);
                        if (!--pending)
                            done(null, results);
                    }
                });
            });
        });
    }
    ;
};






















var exports = module.exports = {};

exports.tree = function filewalk(dir) {
    const fs = require('fs');
    var results = {
        files: [],
        dirs: []
    };
    var currentdir = dir;
    var allfiles = [currentdir];
    var moredir = 1;
    return new Promise(resolve => {

        function walk(dir) {

            position = allfiles.indexOf(currentdir);
            if (~position)
            {
                allfiles.splice(position, 1);
            }
            fs.readdir(dir, function (err, files) {
                if (err)
                {
                    console.log(err);
                    return;
                }
                moredir -= moredir;
                files.forEach(file => allfiles.push(file));

                files.forEach(file => {
                    fs.stat(dir + "/" + file, function (err, stats) {
                        if (stats.isFile()) {
                            results.files.push(dir + "/" + file);
                            position = allfiles.indexOf(file);
                            if (~position)
                            {
                                allfiles.splice(position, 1);
                            }
                            if (allfiles.length === 0 && moredir === 0) {
                                resolve(results);
                            }
                        }
                        if (stats.isDirectory()) {
                            results.dirs.push(dir + "/" + file);
                            currentdir = file;
                            moredir += 1;
                            walk(dir + "/" + file);
                        }
                    });

                });
            });
        }

        return walk(dir);
    });
};






















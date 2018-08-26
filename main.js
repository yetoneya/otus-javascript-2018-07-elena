const fs = require('fs');
const path=require('path');

var inputdir="animals";
if (process.argv.slice(2).length!==0) {
    var inputdir = process.argv[2];
}

function filewalk(dir) {

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
                            results.files.push(dir+"/"+file);
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
                            results.dirs.push(dir+"/"+file);
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
}

filewalk(inputdir).then((res) => {
    console.log(res);
    
}).catch(err=>console.log(err));




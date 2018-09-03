const fs = require('fs');
const path = require('path');


var inputdir=(process.argv.slice(2).length !== 0?process.argv[2]:"animals"); 


function filewalk(dir) {

    var results = {
        files: [],
        dirs: []
    };

    return new Promise(resolve => {
        var visit = [];
        var moredir=1;
        function walk(dir) {
            moredir-=1;
            fs.readdir(dir, function (err, files) {
                if (err)
                {
                    console.log(err);
                    return;
                }
                files.forEach(file => visit.push(false));
                files.forEach(file => {
                    fs.stat(dir + "/" + file, function (err, stats) {
                        s: if (stats.isFile()) {
                            results.files.push(dir + "/" + file);
                            m:for (var i = 0; i < visit.length; i++) {
                                if (visit[i] === false) {
                                    visit[i] = true;
                                    if(visit[visit.length-1]===true&&moredir===0)break m;
                                    break s;
                                }
                            }
                            resolve(results);
                        }
                        if (stats.isDirectory()) {
                            moredir+=1;
                            results.dirs.push(dir + "/" + file);
                            for (var i = 0; i < visit.length; i++) {
                                if (visit[i] === false) {
                                    visit[i] = true;
                                    break;
                                }
                            }
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

}).catch(err => console.log(err));




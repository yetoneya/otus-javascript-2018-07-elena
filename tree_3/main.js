const path = require('path');
const tree=require('./tree');
var inputdir = (process.argv.slice(2).length !== 0 ? process.argv[2] : "animals");

tree.tree(inputdir).then((res) => {
    console.log(res);
    
}).catch(err=>console.log(err));




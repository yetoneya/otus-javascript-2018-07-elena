'use strict';
const {Readable} = require('stream');
const {Writable} = require('stream');
const {Transform} = require('stream');
class Source extends Readable
{
    constructor(array_of_data = [], opt = {})
    {
        super(opt);
        this._array_of_data = array_of_data;

    }
    _read()
    {
        let data = this._array_of_data.shift();

        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }
}

class Transformer extends Transform
{
    constructor(opt = {})
    {
        super(opt);

    }

    _transform(chunk, encoding, done)
    {
        this.push(chunk + Math.random());
        done();
    }
    _flush(done)
    {
        done();
    }
}

class Writer extends Writable
{
    constructor(opt = {})
    {
        super(opt);

    }
    _write(chunk, encoding, done)
    {
        console.log(chunk);
        done();
    }
}

var numbers = new Array();
for (var i = 0; i < 10; i++) {
    numbers.push(Math.random());
}

let r_opts = {
    objectMode: true,
    highWaterMark: 10
};

const R = new Source(numbers, r_opts);
let t_opts = {
    readableObjectMode: true,
    writableObjectMode: true

};
const T = new Transformer(t_opts);
let w_opts = {
    objectMode: true,
    highWaterMark: 10
};
const W = new Writer(w_opts);

R.pipe(T).pipe(W);
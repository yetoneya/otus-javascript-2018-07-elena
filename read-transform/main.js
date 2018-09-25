'use strict';
const {Readable} = require('stream');
const {Writable} = require('stream');
const {Transform} = require('stream');
class Source extends Readable
{
    _read()
    {
        function* generateSequence() {
            for (let i = 0; i < 10; i++) {
                yield Math.random();
            }
            return yield null;
        }
        let generator = generateSequence();
        for (let data of generator) {

            if (!data)
                this.push(null);
            else           
                this.push(data);
            
        }

    }
}

class Transformer extends Transform
{

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
;

class Writer extends Writable
{

    _write(chunk, encoding, done)
    {
        console.log(chunk);
        done();
    }
}
;


let r_opts = {
    objectMode: true,
    highWaterMark: 10
};

const R = new Source(r_opts);
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
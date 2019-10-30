const { GraphemeSplitter } = require('../lib/index')
const splitter = new GraphemeSplitter();
// const input =  'a🇦🇧🇨🇩b';
// const input =  'a🇦🇧🇨b';
const input =  '🇦🇧🇨🇦🇧🇨b';
const splitGraphemes2 = function (str) {
    let res = [];
    let index = str.length;
    let brk;
    while ((brk = splitter.prevBreak(str, index)) > 0) {
        res.push(str.slice(brk, index));
        index = brk;
    }
    if (index > 0) {
        res.push(str.slice(0, index));
    }
    return res.reverse();
}

const result = splitter.splitGraphemes(input);
const result2 = splitGraphemes2(input);


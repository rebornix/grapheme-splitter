/**
 * The filesrc/index.ts was derived from the package https://github.com/orling/grapheme-splitter
 */
const fs = require("fs");
const path = require("path");
const convert = require("./converter");

const content = fs.readFileSync(path.resolve(__dirname, "./unicode/GraphemeBreakProperty.txt"), {
    encoding: 'utf8'
});

// print processed JavaScript code to stdout
const ret = convert(content);
console.log(ret.preDefinedClassifiers.join('\n'));
console.log(ret.matchBlocks);

const emojiContent = fs.readFileSync(path.resolve(__dirname, "./unicode/emoji.txt"), {
    encoding: 'utf8'
});

// print processed JavaScript code to stdout
console.log(convert(emojiContent, function (category) {
    return category === "Extended_Pictographic"
}));
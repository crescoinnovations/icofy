'use strict';

const fs = require('fs');
const path = require('path');

const isImage = require('is-image');
const sizeOf = require('image-size');
const favicons = require('favicons');

// Usage: icofy <image-file> <destination>

let [input, destination] = process.argv.splice(2);

if (destination == undefined) destination = process.cwd();

if (!isImage(input)) {
    console.log('File need to be an image');
    process.exit(1);
}

const dimensions = sizeOf(input);

if (dimensions.width < 70 && dimensions.height < 70) {
    console.log('Image dimensions must be higher then 70x70');
    process.exit(1);
}

favicons(input, undefined, (error, response) => {
    if (error) process.exit(1);

    for (const { name, contents } of response.images) {
        console.log(`⚡ Writing file ${name}`);
        fs.writeFileSync(path.resolve(destination, name), contents);
    }
});


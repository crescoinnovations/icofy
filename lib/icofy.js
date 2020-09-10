'use strict';

const fs = require('fs');
const path = require('path');

const { input, destination, icons } = require('./cli');

const favicons = require('favicons');


const save = (name, contents) => fs.writeFileSync(path.resolve(destination, name), contents);

favicons(input, icons, (error, response) => {
    if (error) console.log(error);

    for (const { name, contents } of response.images) {
        console.log(`⚡ Writing file ${name}`);

        save(name, contents);
    }
});


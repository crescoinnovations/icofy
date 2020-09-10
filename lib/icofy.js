'use strict';

const fs = require('fs');
const path = require('path');

const { input, destination, icons } = require('./cli');

const favicons = require('favicons');

const possible = {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
};


console.log(icons);

// icons.map((icon, index) => {
//     possible[icon] = true;
// });


const save = (name, contents) => fs.writeFileSync(path.resolve(destination, name), contents);

favicons(input, { icons: possible }, (error, response) => {
    if (error) console.log(error);

    for (const { name, contents } of response.images) {
        console.log(`⚡ Writing file ${name}`);

        save(name, contents);
    }
});


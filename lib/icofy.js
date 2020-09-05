'use strict';

const { Command } = require('commander');

const fs = require('fs');
const path = require('path');

const favicons = require('favicons');

const Validator = require('./validate');

const program = new Command();

program.version('0.0.1', '-v, --version', 'output the current version');
program.description('A tool to convert image files to .ico for faster front-end development 🚀');

program.usage('<image-file> <output>');
program.option('-i, --icons [icons...]', 'specify which icons to include');

program.parse(process.argv);

if (!program.args.length)
    program.help();

let [input, destination] = program.args;

if (destination == undefined) destination = process.cwd();

let validator = new Validator(input);

if (!validator.validate()) program.help(str => validator.error + '\n\n' + str)

const icons = {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
};

const save = (name, contents) => {
    console.log(`⚡ Writing file ${name}`);

    fs.writeFileSync(path.resolve(destination, name), contents);
};

favicons(input, { icons: icons }, (error, response) => {
    if (error) process.exit(1);

    for (const { name, contents } of response.images) save(name, contents);
});


'use strict';

const { Command } = require('commander');

const fs = require('fs');
const path = require('path');

const isImage = require('is-image');
const sizeOf = require('image-size');
const favicons = require('favicons');

const program = new Command();

program.version('0.0.1', '-v, --version', 'output the current version');
program.description('A tool to convert image files to .ico for faster front-end development 🚀');

program.usage('<image-file> <output>');
program.option('-i, --icons [icons...]', 'specify which icons to include');

program.parse(process.argv);

if (!program.args.length) program.help();

let [input, destination] = program.args;

if (destination == undefined) destination = process.cwd();

const help = (message) => program.help(str => message + '\n\n' + str);

if (!isImage(input)) help('Given file is not an image');

const { width, height } = sizeOf(input);

if (width < 70 || height < 70) help('Image dimensions must be higher then 70x70')

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


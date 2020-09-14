'use strict';

const { Command } = require('commander');
const Validator = require('./validate');

let icons = {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
};

const program = new Command();

program.option('--which <icons...>', 'specify the icons', (v, d) => v.split(','));
program.version('1.0', '-v, --version', 'output the current version');
program.description('A tool to convert images to favicons 🚀');

program.usage('<image> <output>');

program.parse(process.argv);

program.which.forEach(icon => {
    if (icon == 'apple') {
        icons['appleStartup'] = true;
        icons['appleIcon'] = true;
        return;
    }
    if (icons[icon] == undefined) return;
    icons[icon] = true;
});

const args = program.args;

if (!args.length) program.help();

let [input, destination] = args;

if (destination == undefined) destination = process.cwd();

const validator = new Validator(input);

if (!validator.validate()) program.help(str => validator.error + '\n\n' + str);

module.exports = { input, destination, icons };
'use strict';

const { Command } = require('commander');
const Validator = require('./validate');

let icons = require('./icons');

const program = new Command();

program.option('--which <icons...>', 'specify the icons', (v, d) => v.split(','));
program.version('1.0', '-v, --version', 'output the current version');
program.description('A tool to convert images to favicons 🚀');

program.usage('<image> <output>');

program.parse(process.argv);


(program.which).map((icon, index) => {
    if (icon == 'apple') {
        icons['appleIcon'] = true;
        icons['appleStartup'] = true;
    } else {
        icons[icon] = true;
    }
});

console.table(icons);

const args = program.args;

if (!args.length) program.help();

let [input, destination] = args;

if (destination == undefined) destination = process.cwd();

const validator = new Validator(input);

if (!validator.validate()) program.help(str => validator.error + '\n\n' + str);

module.exports = { input, destination, icons };
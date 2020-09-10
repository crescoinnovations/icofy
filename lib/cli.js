'use strict';

const { Command } = require('commander');
const Validator = require('./validate');

const program = new Command();

program.version('1.0', '-v, --version', 'output the current version');
program.description('A tool to convert images to favicons 🚀');

program.usage('<image-file> <output>');
program.option('-i, --icons [icons...]', 'specify which icons to include');

program.parse(process.argv);

const args = program.args;

if (!args.length) program.help();

let [input, destination] = args;

if (destination == undefined) destination = process.cwd();

const validator = new Validator(input);

if (!validator.validate()) program.help(str => validator.error + '\n\n' + str)

module.exports = { input, destination, icons: [] };
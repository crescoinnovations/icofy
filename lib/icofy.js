'use strict';

const { input, destination } = require('./cli');

const validator = new Validator(input);

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

const save = (name, contents) => fs.writeFileSync(path.resolve(destination, name), contents);

favicons(input, { icons: icons }, (error, response) => {
    if (error) program.help(error);

    for (const { name, contents } of response.images) {
        console.log(`⚡ Writing file ${name}`);

        save(name, contents);
    }
});


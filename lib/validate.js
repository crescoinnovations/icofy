'use strict';

const isImage = require("is-image");
const sizeOf = require('image-size');

module.exports = class Validator {
    constructor(input) {
        this.input = input;
        this.error = undefined;
    }

    validate() {
        if (!isImage(this.input)) {
            this.error = "Given file is not an image";
            return false;
        }

        const { width, height } = sizeOf(this.input);

        if (width < 70 || height < 70) {
            this.error = "Image dimensions must be higher then 70x70";
            return false;
        }

        return this.error === undefined;
    }
}
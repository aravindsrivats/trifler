'use strict';

var beautify = require('js-beautify');

module.exports = function TrifleModel(info) {
    return {
        title: info.title,
        html: beautify.html(info.html),
        css: beautify.css(info.css),
        js: beautify.js(info.js)
    };
};

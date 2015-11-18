'use strict';

var shortid = require('shortid'),
    debug = require('debug')('trifler'),
    htmlminify = require('html-minifier').minify,
    cleancss = require('clean-css'),
    uglifyjs = require('uglify-js').minify;

module.exports = function(router) {
    router.post('/', function(req, res) {
        var key = shortid.generate();
        var trifle = {
            title: (typeof req.body.title === 'undefined') ? '' : req.body.title
        };

        if (typeof req.body.html === 'undefined' || req.body.html === '') {
            trifle.html = '';
        } else {
            trifle.html = htmlminify(req.body.html, {
                keepClosingSlash: true
            });
            debug('Minifed HTML: ' + trifle.html);
        }
        if (typeof req.body.css === 'undefined' || req.body.css === '') {
            trifle.css = '';
        } else {
            trifle.css = new cleancss().minify(req.body.css).styles;;
            debug('Minified CSS: ' + trifle.css);
        }
        if (typeof req.body.js === 'undefined' || req.body.js === '') {
            trifle.js = '';
        } else {
            trifle.js = uglifyjs(req.body.js, {
                fromString: true
            }).code;
            debug('Minified JS: ' + trifle.js);
        }
        req.store.set(key, trifle, function(error) {
            if (error) {
                debug('Couldn\'t create a trifle');
                res.redirect('/trifler');
            } else {
                debug('Created new trifle with key: ' + key);
                res.redirect('/trifler/' + key);
            }
        });
    });
};

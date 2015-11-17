'use strict';

var shortid = require('shortid'),
    debug = require('debug')('trifler'),
    minify = require('minify');

module.exports = function(router) {
    router.post('/', function(req, res) {
        var key = shortid.generate();
        var trifle = {
            title: (typeof req.body.title === 'undefined') ? '' : req.body.title
        };

        if (typeof req.body.html === 'undefined' || req.body.html === '') {
            trifle.html = '';
        } else {
            minify.html(req.body.html, function(error, minified) {
                if (error) {
                    debug('HTML Minify error!');
                } else {
                    debug('Minifed HTML: ' + minified);
                    trifle.html = minified;
                }
            });
        }
        if (typeof req.body.css === 'undefined' || req.body.css === '') {
            trifle.css = '';
        } else {
            minify.css(req.body.css, function(error, minified) {
                if (error) {
                    debug('CSS Minify error!');
                } else {
                    debug('Minifed CSS: ' + minified);
                    trifle.css = minified;
                }
            });
        }
        if (typeof req.body.js === 'undefined' || req.body.js === '') {
            trifle.js = '';
        } else {
            minify.js(req.body.js, function(error, minified) {
                if (error) {
                    debug('JS Minify error!');
                } else {
                    debug('Minified JS: ' + minified);
                    trifle.js = minified;
                }
            });
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

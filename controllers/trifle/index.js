'use strict';

var debug = require('debug')('trifler');

module.exports = function(router) {
    router.post('/', function(req, res) {
        var trifle = {
            title: (typeof req.body.title === 'undefined') ? '' : req.body.title,
            html: (typeof req.body.html === 'undefined') ? '' : req.body.html,
            css: (typeof req.body.css === 'undefined') ? '' : req.body.css,
            js: (typeof req.body.js === 'undefined') ? '' : req.body.js,
            scripts: (typeof req.body.scripts === 'undefined') ? [] : JSON.parse(req.body.scripts),
            stylesheets: (typeof req.body.stylesheets === 'undefined') ? [] : JSON.parse(req.body.stylesheets)
        };
        debug('Generated iframe:');
        debug(JSON.stringify(trifle));
        res.render('iframe/body', trifle);
    });
};

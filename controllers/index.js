'use strict';

var IndexModel = require('../models/index'),
    TrifleModel = require('../models/trifle'),
    debug = require('debug')('trifler');

module.exports = function(router) {
    router.get('/', function(req, res) {
        var info = {
            title: 'Trifler',
            message: 'Your open source alternative to jsFiddle.',
            csrf: res.locals._csrf
        };
        res.render('index', new IndexModel(info));
    });

    router.get('/:key', function(req, res) {
        var info = {
            title: 'Trifler',
            message: 'Your open source alternative to jsFiddle.',
            csrf: res.locals._csrf
        };
        req.store.get(req.params.key, function(error, trifle) {
            if(error) {
                debug('A trifle for the key could not be found!');
            }
            else {
                info.trifle = new TrifleModel(trifle);
                debug('Selected trifle: ' + JSON.stringify(info.trifle));
            }
            res.render('index', new IndexModel(info));
        });
    });
};

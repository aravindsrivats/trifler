'use strict';

var IndexModel = require('../models/index');

module.exports = function(router) {
    router.get('/', function(req, res) {
        var info = {
            title: 'Trifler',
            message: 'Your open source alternative to jsFiddle.'
        };
        res.render('index', new IndexModel(info));
    });
};

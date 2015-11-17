'use strict';

var express = require('express'),
    kraken = require('kraken-js'),
    debug = require('debug')('trifler'),
    TriflerStore = require('./lib/triflerStore'),
    options, app, port, triflerStore;

options = {
    onconfig: function(config, next) {
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

var redisOptions = {
    host: '127.0.0.1',
    port: 6379
};
triflerStore = new TriflerStore(redisOptions);

app.use(function(req, res, next) {
    req.store = triflerStore;
    next();
});

app.on('start', function() {
    port = app.kraken.get('port');
    app.listen(port, function() {
        debug('Application ready to serve requests.');
        debug('Environment: %s', app.kraken.get('env:env'));
    });
});

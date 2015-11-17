'use strict';

var express = require('express'),
    kraken = require('kraken-js'),
    debug = require('debug')('trifler'),
    options, app, port;

options = {
    onconfig: function(config, next) {
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

app.on('start', function() {
    port = app.kraken.get('port');
    app.listen(port, function() {
        debug('Application ready to serve requests.');
        debug('Environment: %s', app.kraken.get('env:env'));
    });
});

'use strict';

var express = require('express'),
    kraken = require('kraken-js'),
    debug = require('debug')('trifler'),
    redis = require('redis'),
    redisHost = '127.0.0.1',
    redisPort = 6379,
    options, app, port, redisClient;

options = {
    onconfig: function(config, next) {
      next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

redisClient = redis.createClient(redisPort, redisHost);
redisClient.on('connect', function() {
  debug('Redis Store connection established.');
});

app.use(function(req, res, next) {
    req.redis = redisClient;
    next();
});

app.on('start', function() {
    port = app.kraken.get('port');
    app.listen(port, function() {
        debug('Application ready to serve requests.');
        debug('Environment: %s', app.kraken.get('env:env'));
    });
});

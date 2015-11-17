'use strict';

var redis = require('redis'),
    debug = require('debug')('trifler');

var TriflerStore = function(options, store) {
    if (store) {
        TriflerStore.client = store;
        debug('Using existing redis client.');
    } else {
        if (options.host === '' || typeof options.host === 'undefined') {
            options.host = '127.0.0.1';
            debug('Using default host');
        }
        if (options.port === '' || typeof options.port === 'undefined') {
            options.port = 6379;
            debug('Using default port');
        }
        TriflerStore.client = redis.createClient(options.port, options.host);
        debug('Creating redis client.');
    }
};

TriflerStore.prototype.get = function(key, callback) {
    TriflerStore.client.get(key, function(error, response) {
        if (error) {
            debug('Could not get for key.');
        } else {
            debug('Value for key('+key+'): ' + response);
        }
        callback(error, response);
    });
};

TriflerStore.prototype.set = function(key, value, callback) {
    TriflerStore.client.set(key, value, function(error, response) {
        if (error) {
            debug('Could set key/value to redis store.');
        } else {
            debug('Key/value successfully set to redis store.');
        }
        debug(response);
        callback(error);
    });
};

module.exports = TriflerStore;

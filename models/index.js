'use strict';

module.exports = function IndexModel(info) {
    return {
        page: 'index',
        title: info.title,
        message: info.message,
        csrf: info.csrf
    };
};

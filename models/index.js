'use strict';

module.exports = function IndexModel(info) {
    var model = {
        page: 'index',
        title: info.title,
        message: info.message,
        csrf: info.csrf,
        trifle: {
            html: '',
            css: '',
            js: ''
        }
    };
    if (typeof info.trifle !== 'undefined') {
        model.trifle = info.trifle;
    }
    return model;
};

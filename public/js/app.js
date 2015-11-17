'use strict';

require(['config'], function(config) {
    require(['jquery'], function($) {
        var app = {
            initialize: function() {
                function post(path, params, method) {
                    //from http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
                    method = method || 'post';
                    var form = document.createElement('form');
                    form.setAttribute('method', method);
                    form.setAttribute('action', path);
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            var hiddenField = document.createElement('input');
                            hiddenField.setAttribute('type', 'hidden');
                            hiddenField.setAttribute('name', key);
                            hiddenField.setAttribute('value', params[key]);
                            form.appendChild(hiddenField);
                        }
                    }
                    document.body.appendChild(form);
                    form.submit();
                }
                $(document).ready(function() {
                    $('#save').click(function() {
                        var params = {
                            html: $('#html').val(),
                            css: $('#css').val(),
                            js: $('#js').val()
                        };
                        post('/trifler/save/', params);
                    });
                });
            }
        };
        app.initialize();
    });
});

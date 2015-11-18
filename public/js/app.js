'use strict';

require(['config'], function(config) {
    require(['jquery', 'codemirror', 'jade!../views/iframe/head', 'jade!../views/iframe/body', 'codemirror/mode/xml/xml', 'codemirror/mode/javascript/javascript', 'codemirror/mode/css/css'], function($, cm, headFrame, bodyFrame) {
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
                    var hiddenField = document.createElement('input');
                    hiddenField.setAttribute('type', 'hidden');
                    hiddenField.setAttribute('name', '_csrf');
                    hiddenField.setAttribute('value', window.csrf);
                    form.appendChild(hiddenField);
                    document.body.appendChild(form);
                    form.submit();
                }

                function setupEditor(textarea, mode, options) {
                    var settings = {
                        mode: mode,
                        lineNumbers: true
                    };
                    for (var key in options) {
                        settings[key] = options[key];
                    }
                    return cm.fromTextArea(document.getElementById(textarea), settings);
                }

                $(document).ready(function() {
                    window.htmlcm = setupEditor('html', 'xml', {
                        htmlMode: true
                    });
                    window.csscm = setupEditor('css', 'css');
                    window.jscm = setupEditor('js', 'javascript');
                    $('#save').click(function() {
                        var params = {
                            html: window.htmlcm.getValue(),
                            css: window.csscm.getValue(),
                            js: window.jscm.getValue()
                        };
                        post('/trifler/save/', params);
                    });
                    $('#run').click(function() {
                        var head = {
                            title: 'By Trifler',
                            css: window.csscm.getValue(),
                            js: window.jscm.getValue()
                        };]
                        $('.result').contents().find('head').html(headFrame(head));
                        $('.result').contents().find('body').html(bodyFrame({
                            html: window.htmlcm.getValue()
                        }));
                    });
                });
            }
        };
        app.initialize();
    });
});

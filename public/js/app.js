'use strict';

require(['config'], function(config) {
    require(['jquery', 'codemirror', 'beautify/beautify', 'beautify/beautify-css', 'beautify/beautify-html', 'codemirror/mode/xml/xml', 'codemirror/mode/javascript/javascript', 'codemirror/mode/css/css'], function($, cm, jsbeauty, cssbeauty, htmlbeauty) {
        var app = {
            initialize: function() {
                var post = function(path, params, method, target) {
                    //from http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
                    method = method || 'post';
                    target = target || '_self';
                    var form = document.createElement('form');
                    form.setAttribute('method', method);
                    form.setAttribute('action', path);
                    form.setAttribute('target', target);
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
                };

                var setupEditor = function(textarea, mode, options) {
                    var settings = {
                        mode: mode,
                        lineNumbers: true
                    };
                    for (var key in options) {
                        settings[key] = options[key];
                    }
                    return cm.fromTextArea(document.getElementById(textarea), settings);
                };

                $(document).ready(function() {
                    window.htmlcm = setupEditor('html', 'xml', {
                        htmlMode: true
                    });
                    window.csscm = setupEditor('css', 'css');
                    window.jscm = setupEditor('js', 'javascript');
                    $('#save').click(function() {
                        var params = {
                            title: $('#title').val(),
                            html: window.htmlcm.getValue(),
                            css: window.csscm.getValue(),
                            js: window.jscm.getValue()
                        };
                        post('/trifler/save/', params, 'post');
                    });
                    $('#run').click(function() {
                        var params = {
                            title: $('#title').val(),
                            css: window.csscm.getValue(),
                            html: window.htmlcm.getValue(),
                            js: window.jscm.getValue(),
                            scripts: [],
                            stylesheets: []
                        };
                        var option = $('option:selected', $('#library'));
                        if (option.val() !== 'none')
                            params.scripts.push(option.val());
                        if (typeof option.attr('css') !== 'undefined')
                            params.stylesheets.push(option.attr('rel'));
                        if (typeof option.attr('rel') !== 'undefined')
                            params.scripts.push(option.attr('rel'));
                        params.scripts = JSON.stringify(params.scripts);
                        params.stylesheets = JSON.stringify(params.stylesheets);
                        post('/trifler/trifle/', params, 'post', 'frame');

                    });
                    $('#beautify').click(function() {
                        window.htmlcm.setValue(htmlbeauty.html_beautify(window.htmlcm.getValue()));
                        window.csscm.setValue(cssbeauty.css_beautify(window.csscm.getValue()));
                        window.jscm.setValue(jsbeauty.js_beautify(window.jscm.getValue()));
                    });
                });
            }
        };
        app.initialize();
    });
});

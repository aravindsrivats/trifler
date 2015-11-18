'use strict';

require(['config'], function(config) {
    require(['jquery', 'codemirror', 'jade!../views/iframe/head', 'jade!../views/iframe/body', 'beautify/beautify', 'beautify/beautify-css', 'beautify/beautify-html', 'codemirror/mode/xml/xml', 'codemirror/mode/javascript/javascript', 'codemirror/mode/css/css'], function($, cm, headFrame, bodyFrame, jsbeauty, cssbeauty, htmlbeauty) {
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

                function attachJS(id, js) {
                    var iframe = document.getElementById(id);
                    var script = iframe.contentWindow.document.createElement('script');
                    script.type = 'text/javascript';
                    script.innerHTML = js;
                    iframe.contentWindow.document.body.appendChild(script);
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
                        $('.result').contents().find('head').html(headFrame({
                            title: 'By Trifler',
                            css: window.csscm.getValue()
                        }));
                        $('.result').contents().find('body').html(bodyFrame({
                            html: window.htmlcm.getValue()
                        }));
                        attachJS('frame', window.jscm.getValue());
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

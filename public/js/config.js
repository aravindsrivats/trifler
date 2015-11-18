'use strict';

requirejs.config({
    baseUrl: '/trifler/js',
    paths: {
        jquery: '../components/jquery/dist/jquery.min'
    },
    packages: [{
        name: "codemirror",
        location: "../components/codemirror",
        main: "lib/codemirror"
    }]
});

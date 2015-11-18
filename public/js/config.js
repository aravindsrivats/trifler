'use strict';

requirejs.config({
    baseUrl: '/trifler/js',
    paths: {
        jquery: '../components/jquery/dist/jquery.min',
        jade: '../components/require-jade/jade'
    },
    packages: [{
        name: "codemirror",
        location: "../components/codemirror",
        main: "lib/codemirror"
    }]
});

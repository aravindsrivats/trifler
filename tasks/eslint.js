'use strict';

module.exports = function eslint(grunt) {
    grunt.loadNpmTasks('gruntify-eslint');
    return {
        options: {
            config: '.eslintrc',
            rulesdir: ['node_modules/eslint/lib/rules']
        },
        src: ['index.js',
            'controllers/*.js',
            'models/*.js',
            'tasks/*.js'
        ]
    };
};

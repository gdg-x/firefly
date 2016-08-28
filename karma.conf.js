// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/angular-google-chart/ng-google-chart.js',
      'client/bower_components/lodash/lodash.js',
      'client/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'client/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'client/bower_components/ngGeolocation/ngGeolocation.js',
      'client/bower_components/angular-linkify/angular-linkify.js',
      'client/bower_components/angularjs-viewhead/angularjs-viewhead.js',
      'client/bower_components/devintent-qr/src/angular-qr.js',
      'client/app/firefly.module.js',
      'client/app/firefly.config.js',
      'client/app/**/*.js',
      'client/app/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};

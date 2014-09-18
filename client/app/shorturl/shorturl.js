'use strict';

angular.module('fireflyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:hash/analytics', {
        templateUrl: 'app/shorturl/shorturl.analytics.html',
        controller: 'ShorturlAnalyticsCtrl'
      })
      .when('/:hash/', {
        templateUrl: 'app/shorturl/shorturl.event.html',
        controller: 'ShorturlEventCtrl'
      });
  });

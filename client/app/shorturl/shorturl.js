'use strict';

angular.module('fireflyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:hash/analytics', {
        templateUrl: 'app/shorturl/shorturlAnalytics.html',
        controller: 'ShorturlAnalyticsCtrl',
        controllerAs: 'vm'
      })
      .when('/event/:hash', {
        templateUrl: 'app/shorturl/shorturlEvent.html',
        controller: 'ShorturlEventCtrl',
        controllerAs: 'vm'
      })
      .when('/:hash/', {
        templateUrl: 'app/shorturl/shorturlEvent.html',
        controller: 'ShorturlEventCtrl',
        controllerAs: 'vm'
      });
  });

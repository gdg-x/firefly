'use strict';

angular.module('fireflyApp')
  .constant('GOOGLE_API_KEY', 'Set in /local.env.js')
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('indigo');

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/invite', {
        templateUrl: 'app/site/app-invite.html'
      })
      .when('/:tag/events', {
        templateUrl: 'app/main/eventList.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/event/:hash', {
        templateUrl: 'app/shorturl/shorturlEvent.html',
        controller: 'ShorturlEventCtrl',
        controllerAs: 'vm'
      })
      .when('/:tag', {
        redirectTo: '/:tag/events'
      })
      .otherwise({ redirectTo: '/' });
  })
  .config(function (uiGmapGoogleMapApiProvider, GOOGLE_API_KEY) {
    uiGmapGoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY,
      v: '3.25',
      libraries: 'weather,geometry,visualization'
    });
  })
  .service('config', config);

function config(GOOGLE_API_KEY) {
  return {
    GOOGLE_API_KEY: GOOGLE_API_KEY,
    HUB_IP: 'https://hub.gdgx.io/',
    DOMAIN: 'gdg.events',
    DEFAULT_PREFIX: 'devfest'
  };
}

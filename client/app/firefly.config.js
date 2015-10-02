'use strict';

angular.module('fireflyApp')
  .constant('GOOGLE_API_KEY', 'AIzaSyB8TbB56as1AvPp-2GvJrygEREs8BOqZBY')
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('indigo');
  })
  .config(function (uiGmapGoogleMapApiProvider, GOOGLE_API_KEY) {
    uiGmapGoogleMapApiProvider.configure({
      key: GOOGLE_API_KEY,
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  })
  .service('config', config);

function config(GOOGLE_API_KEY) {
  return {
    GOOGLE_API_KEY: GOOGLE_API_KEY,
    HUB_IP: 'http://146.148.62.106/',
    DOMAIN: 'localtest.me:9000',
    DEFAULT_PREFIX: 'devfest'
  };
}

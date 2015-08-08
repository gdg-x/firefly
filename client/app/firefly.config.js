'use strict';

angular.module('fireflyApp')
  .constant('GOOGLE_API_KEY', 'AIzaSyD7v04m_bTu-rcWtuaN3fTP9NBmjhB7lXg')
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
    DOMAIN: 'localhost',
    DEFAULT_PREFIX: 'devfest'
  };
}

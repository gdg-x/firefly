'use strict';

angular.module('fireflyApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngMaterial', 'ngAria',
  'googlechart', 'uiGmapgoogle-maps', 'ngGeolocation', 'linkify', 'viewhead', 'ja.qr'
]).run(function($rootScope, $window, $geolocation) {
  $geolocation.watchPosition({
      timeout: 60000,
      maximumAge: 250,
      enableHighAccuracy: true
    });

  $rootScope.$on('$geolocation.position.changed', function(event, value) {
      if (!$rootScope.geo) {
        $rootScope.geo = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
          timestamp: value.timestamp
        };
      }
    });
});

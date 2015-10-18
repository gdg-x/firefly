'use strict';

angular.module('fireflyApp')
  .controller('ShorturlEventCtrl', function ($http, $routeParams, config, themeService) {
    var vm = this;
    vm.convertHex = themeService.convertHex;

    $http.get('/api/shorturl/' + $routeParams.hash).success(function (data) {
      vm.shorturl = data;
      vm.gdgeventsshorturl = 'http://' + config.DOMAIN + '/' + data.hash;
      $http.jsonp(config.HUB_IP + 'api/v1/events/' +
        data.event_id + '?callback=JSON_CALLBACK').success(processEventData); // jshint ignore:line
    });

    function processEventData(data) {
      if (data.geo) {
        data.geo.latitude = data.geo.lat;
        data.geo.longitude = data.geo.lng;
        data.geo.zoom = 11;
        data.geo.options = { scrollwheel: false };
        data.geo.center = {
          latitude: data.geo.latitude,
          longitude: data.geo.longitude
        };
        delete data.geo.lat;
        delete data.geo.lng;
      }
      vm.event = data;
      vm.hubIp = config.HUB_IP;

      var chapterUrl = 'https://www.googleapis.com/plus/v1/people/' + vm.event.chapter +
        '?fields=image&key=' + config.GOOGLE_API_KEY;

      $http.get(chapterUrl)
        .success(function (data) {
          vm.image = data.image.url.replace('sz=50', 'sz=70');
        }
      );

      $http.jsonp(config.HUB_IP + 'api/v1/chapters/' + vm.event.chapter + '?callback=JSON_CALLBACK')
        .success(function (data) {
          if (data.geo) {
            data.geo.latitude = data.geo.lat;
            data.geo.longitude = data.geo.lng;
            delete data.geo.lat;
            delete data.geo.lng;
          }
          vm.chapter = data;
        }
      );
    }
  });

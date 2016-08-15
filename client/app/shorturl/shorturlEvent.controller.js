'use strict';

angular.module('fireflyApp')
  .controller('ShorturlEventCtrl', function ($http, $routeParams, $location, $log, config, themeService) {
    var vm = this;
    vm.convertHex = themeService.convertHex;

    $http.jsonp(config.HUB_IP + 'api/v1/events/' + $routeParams.hash + '?callback=JSON_CALLBACK')
    .success(processEventData)
    .catch(function() {
      $log.warn('Event "' + $routeParams.hash + '" not found.');
      $location.path('/');
    });

    function processEventData(eventData) {
      if (eventData.geo) {
        eventData.geo.center = {
          latitude: eventData.geo.lat,
          longitude: eventData.geo.lng
        };
        // Specified separately from the center, as the center can change if the map is dragged/panned.
        eventData.geo.location = {
          latitude: eventData.geo.lat,
          longitude: eventData.geo.lng
        };
        eventData.geo.zoom = 11;
        eventData.geo.control = {};
        eventData.geo.options = {
          scrollwheel: false,
          draggable: false
        };
      }
      vm.event = eventData;
      vm.hubIp = config.HUB_IP;

      var chapterUrl = 'https://www.googleapis.com/plus/v1/people/' + vm.event.chapter +
        '?fields=image&key=' + config.GOOGLE_API_KEY;
      $http.get(chapterUrl)
        .success(function (data) {
          vm.image = data.image.url.replace('sz=50', 'sz=70');
        }
      );

      $http.jsonp(config.HUB_IP + 'api/v1/chapters/' + vm.event.chapter + '?callback=JSON_CALLBACK')
        .success(function (chapterData) {
          vm.chapter = chapterData;
        }
      );
    }
  });

'use strict';

angular.module('fireflyApp')
  .controller('MainCtrl', function ($rootScope, $filter, $routeParams, $http, $location, $window, config) {
    var vm = this;
    vm.domain = config.DOMAIN;

    if ($routeParams.tag) {
      $rootScope.prefix = $routeParams.tag;
      vm.all = false;
    } else {
      vm.all = true;
      $rootScope.prefix = config.DEFAULT_PREFIX;
    }

    $http.jsonp(config.HUB_IP + 'api/v1/tags/' + $rootScope.prefix + '?callback=JSON_CALLBACK')
      .success(function (data) {
      $rootScope.tag = data;
      $rootScope.tagColor = {
          'background-color': $rootScope.tag.color,
          height: '4px'
        };
    });

    $http.jsonp(config.HUB_IP + 'api/v1/events/stats?callback=JSON_CALLBACK')
      .success(function(data) {
        vm.tags = data.upcoming_top_tags; // jshint ignore:line
      }
    );

    vm.openEvent = function (eventId) {
      $location.path('/event/' + eventId);
    };

    vm.openTag = function (path) {
      $location.path(path + '/events/');
    };

    function distanceFromHere(_item, _startPoint) {
      var start = null;

      if (!_item.geo) {
        return Number.MAX_VALUE;
      }

      var radiansTo = function (start, end) {
        if (!start || !end) {
          return 0;
        }

        var d2r = Math.PI / 180.0;
        var lat1rad = start.latitude * d2r;
        var long1rad = start.longitude * d2r;
        var lat2rad = end.latitude * d2r;
        var long2rad = end.longitude * d2r;
        var deltaLat = lat1rad - lat2rad;
        var deltaLong = long1rad - long2rad;
        var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
        var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
        // Square of half the straight line chord distance between both points.
        var a = ((sinDeltaLatDiv2 * sinDeltaLatDiv2) +
            (Math.cos(lat1rad) * Math.cos(lat2rad) *
                sinDeltaLongDiv2 * sinDeltaLongDiv2));
        a = Math.min(1.0, a);
        return 2 * Math.asin(Math.sqrt(a));
      };

      if ($rootScope.geo) {
        start = $rootScope.geo;
      }
      start = _startPoint || start;

      var end = {
        longitude: _item.geo.lng,
        latitude: _item.geo.lat
      };

      var num = radiansTo(start, end) * 3958.8;
      return Math.round(num * 100) / 100;
    }

    var processNextEvent = function(data) {
      if (data && data.items) {
        vm.nextEvent = data.items[0];
        vm.nearEvents = $filter('orderBy')(data.items, distanceFromHere);
        vm.nextEvents = $filter('orderBy')(data.items, 'start');
      }
    };

    if ($rootScope.prefix) {
      if (vm.all) {
        $http.jsonp(config.HUB_IP + 'api/v1/events/tag/' + $rootScope.prefix +
          '?perpage=999&callback=JSON_CALLBACK').success(processNextEvent);
      } else {
        $http.jsonp(config.HUB_IP + 'api/v1/events/tag/' + $rootScope.prefix +
          '/upcoming?perpage=999&callback=JSON_CALLBACK').success(processNextEvent);
      }
    } else {
      if (vm.all) {
        $http.jsonp(config.HUB_IP + 'api/v1/events?perpage=100&callback=JSON_CALLBACK')
          .success(processNextEvent);
      } else {
        $http.jsonp(config.HUB_IP + 'api/v1/events/upcoming?perpage=100&callback=JSON_CALLBACK')
          .success(processNextEvent);
      }
    }
  });

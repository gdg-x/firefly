'use strict';

angular.module('fireflyApp')
  .controller('MainCtrl', function ($rootScope, $routeParams, $scope, $http, $location, $window, config) {
    $scope.domain = config.DOMAIN;
    $scope.nearEvent = undefined;

    if ($routeParams.tag) {
      $scope.prefix = $routeParams.tag;
      $rootScope.tag = $routeParams.tag;
      $scope.all = false;
    }

    $http.jsonp(config.HUB_IP + 'api/v1/events/stats?callback=JSON_CALLBACK')
      .success(function(data) {
        $scope.tags = data.upcoming_top_tags; // jshint ignore:line
      }
    );

    $scope.openEvent = function (eventId) {
      $location.path('/event/' + eventId);
    };

    $scope.openTag = function (path) {
      $window.location.href = 'http://' + path;
    };

    $scope.distanceFromHere = function (_item, _startPoint) {
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
    };

    var processNextEvent = function(data) {
      if (data && data.items) {
        $scope.nextEvent = data.items[0];
        $scope.allEvents = data.items;
      }
    };

    if ($scope.prefix) {
      if ($scope.all) {
        $http.jsonp(config.HUB_IP + 'api/v1/events/tag/' + $scope.prefix +
          '?perpage=999&callback=JSON_CALLBACK').success(processNextEvent);
      } else {
        $http.jsonp(config.HUB_IP + 'api/v1/events/tag/' + $scope.prefix +
          '/upcoming?perpage=999&callback=JSON_CALLBACK').success(processNextEvent);
      }
    } else {
      if ($scope.all) {
        $http.jsonp(config.HUB_IP + 'api/v1/events?perpage=100&callback=JSON_CALLBACK')
          .success(processNextEvent);
      } else {
        $http.jsonp(config.HUB_IP + 'api/v1/events/upcoming?perpage=100&callback=JSON_CALLBACK')
          .success(processNextEvent);
      }
    }
  });

'use strict';

angular.module('fireflyApp').directive('eventMap', eventMap);

eventMap.$inject = ['$http', 'uiGmapGoogleMapApi', 'config'];

function eventMap($http, uiGmapGoogleMapApi, config) {
  return {
    templateUrl: 'app/components/event-map/event-map.html',
    restrict: 'EA',
    scope: {
      position: '=',
      tag: '='
    },
    controller: function($scope) {
      $scope.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 5,
        control: {},
        cluster: {
          maxZoom: 7
        },
        options: {
          scrollwheel: false,
          draggable: true
        }
      };

      $scope.markers = [];

    },
    link: function(scope) {

      uiGmapGoogleMapApi.then(function(maps) {
        scope.maps = maps;
        maps.event.addListener(scope.map.control.getGMap(), 'tilesloaded', function() {
          maps.event.trigger(scope.map.control.getGMap(), 'resize');
        });
      });

      scope.$watch('position', function(position) {
        if (position) {
          scope.map.center = position;
        }
      });

      var processEvents = function(data) {
        var i;
        for (i = 0; i < data.items.length; i++) {
          var event = data.items[i];

          if (event.geo) {
            var marker = {
              id: event._id,
              chapter: event.chapter,
              eventUrl: event.eventUrl,
              title: event.title,
              start: event.start,
              end: event.end,
              timezone: event.timezone,
              show: false,
              coordinates: {
                latitude: event.geo.lat,
                longitude: event.geo.lng
              }
            };

            marker.onClick = function(marker) {
              marker.show = !marker.show;
            }.bind(marker, marker);

            scope.markers.push(marker);
          }
        }

        if (scope.maps) {
          scope.maps.event.trigger(scope.map.control.getGMap(), 'resize');
        }
      };

      if (scope.tag) {
        $http.jsonp(config.HUB_IP + 'api/v1/events/tag/' + scope.tag +
          '/upcoming?perpage=1000&callback=JSON_CALLBACK').success(processEvents);
      } else {
        $http.jsonp(config.HUB_IP + 'api/v1/events/upcoming?perpage=1000&callback=JSON_CALLBACK')
          .success(processEvents);
      }
    }
  };
}

'use strict';

angular.module('fireflyApp')
  .directive('eventMap', ['$http', 'GoogleMapApi'.ns(), function ($http, GoogleMapApi) {
    return {
      templateUrl: 'app/event-map/event-map.html',
      restrict: 'EA',
      scope: {
        position: '=',
        tag: "="
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
            options: {}
          };

          $scope.markers = [];
          
      },
      link: function (scope, element, attrs) {

        GoogleMapApi.then(function(maps) {
          scope.maps = maps;
          maps.event.addListener(scope.map.control.getGMap(), 'tilesloaded', function(evt) {
            maps.event.trigger(scope.map.control.getGMap(), 'resize');
          });
        });

        scope.$watch("position", function(position, old) {
          if(position) {
            angular.copy(position, scope.map.center);
          }
        })

        var processEvents = function(data) {
          for(var i = 0; i < data.items.length; i++) {
            var event = data.items[i];

            if(event.geo) {
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
                scope.$apply(function() {
                  marker.show = !marker.show;
                })
              }.bind(marker, marker);

              scope.markers.push(marker);
              if(scope.maps) scope.maps.event.trigger(scope.map.control.getGMap(), 'resize');
            }
          }
        };

        if(scope.tag) {
          $http.jsonp('https://hub.gdgx.io/api/v1/events/tag/'+scope.tag+'/upcoming?perpage=1000&callback=JSON_CALLBACK').success(processEvents);
        } else {
          $http.jsonp('https://hub.gdgx.io/api/v1/events/upcoming?perpage=1000&callback=JSON_CALLBACK').success(processEvents);
        }
      }
    };
  }]);

'use strict';

angular.module('fireflyApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, $geolocation) {

  	$scope.nearEvent = undefined;

	$rootScope.$watch("geo", function(geo) {
		if(geo) {

		}
	});

	var processNextEvent = function(data) {
		$scope.nextEvent = data.items[0];
		$scope.allEvents = data;
	}

    if($scope.prefix) {
      $http.jsonp('https://hub.gdgx.io/api/v1/events/tag/'+$scope.prefix+'/upcoming?perpage=9999&callback=JSON_CALLBACK').success(processNextEvent);
    } else {
      $http.jsonp('https://hub.gdgx.io/api/v1/events/upcoming?perpage=1&callback=JSON_CALLBACK').success(processNextEvent);
    }
  });

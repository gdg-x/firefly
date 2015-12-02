angular.module('fireflyApp')
  .controller('TagsCtrl', function ($rootScope, $scope, $http, $location, $window, config) {
    $scope.domain = config.DOMAIN;

    $http.jsonp(config.HUB_IP + 'api/v1/tags/active?callback=JSON_CALLBACK').then(function(data){
        $scope.allTags=data;
      }, function(err){
        $scope.error = err;
      });

    $scope.openTag = function (path) {
        $window.location.href = 'http://' + config.DOMAIN + '/' + tag + '/events';
    };
  });

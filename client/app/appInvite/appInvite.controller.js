'use strict';

angular.module('fireflyApp')
  .controller('AppInviteCtrl', function ($rootScope, $http, config) {
    var vm = this;
    vm.domain = config.DOMAIN;

    $http.jsonp(config.HUB_IP + 'api/v1/tags/android?callback=JSON_CALLBACK').success(function(data) {
      $rootScope.tag = data;
    });
  });

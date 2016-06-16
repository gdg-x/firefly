'use strict';

angular.module('fireflyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tags/active', {
        templateUrl: 'app/tags/tagList.html',
        controller: 'TagsCtrl',
        controllerAs: 'vm'
      });
  });

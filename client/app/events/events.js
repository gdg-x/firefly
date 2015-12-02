'use strict';

angular.module('fireflyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:tag/events', {
        templateUrl: 'app/events/eventList.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  });

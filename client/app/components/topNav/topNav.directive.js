'use strict';

angular.module('fireflyApp')
  .directive('fireflyTopNav', function () {
    return {
      templateUrl: 'app/components/topNav/topNav.html',
      restrict: 'EA',
      scope: {
        tag: '='
      }
    };
  });

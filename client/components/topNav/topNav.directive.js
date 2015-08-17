'use strict';

angular.module('fireflyApp')
  .directive('fireflyTopNav', function () {
    return {
      templateUrl: 'components/topNav/topNav.html',
      restrict: 'EA',
      scope: {
        tag: '='
      }
    };
  });

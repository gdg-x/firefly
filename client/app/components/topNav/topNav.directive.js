'use strict';

angular.module('fireflyApp').directive('fireflyTopNav', fireflyTopNav);

function fireflyTopNav() {
  return {
    templateUrl: 'app/components/topNav/topNav.html',
    restrict: 'EA',
    scope: {
      tag: '='
    }
  };
}

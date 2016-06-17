'use strict';

angular.module('fireflyApp')
  .directive('fireflyFooter', function (themeService) {
    return {
      templateUrl: 'app/components/footer/footer.html',
      restrict: 'EA',
      scope: {
        tag: '='
      },
      controller: function () {

      },
      link: function (scope) {
        scope.url = document.URL;
        scope.convertHex = themeService.convertHex;
      }
    };
  });

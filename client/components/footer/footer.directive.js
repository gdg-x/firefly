'use strict';

angular.module('fireflyApp')
  .directive('fireflyFooter', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'EA',
      scope: {
        tag: '='
      },
      controller: function () {

      },
      link: function (scope, iElement, iAttrs, vm) {
        scope.url = document.URL;
        scope.convertHex = convertHex;

        scope.copyUrl = function(e) {
          var clip = new ClipboardEvent('copy');
          clip.clipboardData.setData('text/plain', 'test');
          clip.preventDefault();

          e.target.dispatchEvent(clip);
        };

        /**
         * @param hex color
         * @param opacity percentage
         * @returns {string} formatted as rgba
         */
        function convertHex(hex, opacity) {
          if (!opacity) {
            opacity = 100;
          }
          if (!hex) {
            return 'rgba(0, 0, 0, ' + opacity / 100 + ')';
          }
          hex = hex.replace('#', '');
          return 'rgba(' + parseInt(hex.substring(0, 2), 16) + ',' + parseInt(hex.substring(2, 4), 16) +
            ',' + parseInt(hex.substring(4, 6), 16) + ',' + opacity / 100 + ')';
        }
      }
    };
  });

'use strict';

angular.module('fireflyApp').service('themeService', themeService);

function themeService() {
  return {
    convertHex: convertHex
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

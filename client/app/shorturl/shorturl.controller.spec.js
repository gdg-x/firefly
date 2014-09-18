'use strict';

describe('Controller: ShorturlCtrl', function () {

  // load the controller's module
  beforeEach(module('fireflyApp'));

  var ShorturlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShorturlCtrl = $controller('ShorturlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

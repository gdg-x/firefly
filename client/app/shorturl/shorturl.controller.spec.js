'use strict';

describe('Controller: ShorturlEventCtrl', function () {
  var ShorturlEventCtrl, scope;

  // load the controller's module
  beforeEach(module('fireflyApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShorturlEventCtrl = $controller('ShorturlEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

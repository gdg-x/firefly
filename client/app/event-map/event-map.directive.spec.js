'use strict';

describe('Directive: eventMap', function () {

  // load the directive's module and view
  beforeEach(module('fireflyApp'));
  beforeEach(module('app/event-map/event-map.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event-map></event-map>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the eventMap directive');
  }));
});
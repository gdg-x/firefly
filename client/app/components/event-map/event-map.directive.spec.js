'use strict';

describe('Directive: eventMap', function () {
  var element, scope, $httpBackend;

  // load the directive's module and view
  //noinspection JSValidateTypes
  beforeEach(module('fireflyApp'));
  //noinspection JSValidateTypes
  beforeEach(module('app/components/event-map/event-map.html'));
  beforeEach(inject(function ($rootScope, _$httpBackend_, config) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();

    $httpBackend.expectJSONP(
      config.HUB_IP + 'api/v1/tags/' + scope.prefix + '?callback=JSON_CALLBACK').respond([]);
    $httpBackend.expectJSONP(
      config.HUB_IP + 'api/v1/events/upcoming?perpage=1000&callback=JSON_CALLBACK').respond([]);
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<event-map></event-map>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBeDefined();
  }));
});

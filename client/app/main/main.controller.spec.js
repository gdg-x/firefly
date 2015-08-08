'use strict';

describe('Controller: MainCtrl', function () {
  var MainCtrl, scope, $httpBackend;

  // load the controller's module
  //noinspection JSValidateTypes
  beforeEach(module('fireflyApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.expectJSONP(
      'https://hub.gdgx.io/api/v1/tags/' + scope.prefix + '?callback=JSON_CALLBACK').respond([]);
    $httpBackend.expectJSONP('https://hub.gdgx.io/api/v1/events/stats?callback=JSON_CALLBACK')
      .respond({ upcoming_top_tags: ['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express'] }); // jshint ignore:line
    $httpBackend.expectJSONP(
      'https://hub.gdgx.io/api/v1/events/tag/' + scope.prefix + '/upcoming?perpage=999&callback=JSON_CALLBACK')
      .respond([]);

    $httpBackend.flush();
    expect(scope.tags.length).toBe(4);
  });
});

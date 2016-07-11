'use strict';

describe('Directive: ngReallyClick', function () {

  // load the directive's module
  beforeEach(module('ngReallyClick'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-really-click></ng-really-click>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the ngReallyClick directive');
  }));
});

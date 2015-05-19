'use strict';

describe('Service: dockerContainerService', function () {

  // load the service's module
  beforeEach(module('dockerBrowserApp'));

  // instantiate service
  var dockerContainerService;
  beforeEach(inject(function (_dockerContainerService_) {
    dockerContainerService = _dockerContainerService_;
  }));

  it('should do something', function () {
    expect(!!dockerContainerService).toBe(true);
  });

});

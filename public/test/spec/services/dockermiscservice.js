'use strict';

describe('Service: dockerMiscService', function () {

  // load the service's module
  beforeEach(module('dockerBrowserApp'));

  // instantiate service
  var dockerMiscService;
  beforeEach(inject(function (_dockerMiscService_) {
    dockerMiscService = _dockerMiscService_;
  }));

  it('should do something', function () {
    expect(!!dockerMiscService).toBe(true);
  });

});

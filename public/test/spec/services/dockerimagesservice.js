'use strict';

describe('Service: dockerImagesService', function () {

  // load the service's module
  beforeEach(module('dockerBrowserApp'));

  // instantiate service
  var dockerImagesService;
  beforeEach(inject(function (_dockerImagesService_) {
    dockerImagesService = _dockerImagesService_;
  }));

  it('should do something', function () {
    expect(!!dockerImagesService).toBe(true);
  });

});

'use strict';

describe('Service: configurationservice', function () {

  // load the service's module
  beforeEach(module('dockerBrowserApp'));

  // instantiate service
  var configurationservice;
  beforeEach(inject(function (_configurationservice_) {
    configurationservice = _configurationservice_;
  }));

  it('should do something', function () {
    expect(!!configurationservice).toBe(true);
  });

});

/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.configurationService
 * @description
 * # configurationservice
 * Factory in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .factory('configurationService', function () {
    // Service logic
    // ...
    var host = "http://localhost";
    var port = 4243;

    // Public API here
    return {
      getHost: function () {
        return host;
      },
      getPort: function() {
        return port;
      },
      getService: function(options, path) {
        if (angular.isObject(options)) {
          var configuration = options || {
            host: this.getHost(),
            port: this.getPort()
          };
          return 'http://' + configuration.host + ':' + configuration.port + path;  
        }
        return this.getHost() + ':' + this.getPort() + options;
        
      }
    };

  });

'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.dockerMiscService
 * @description
 * # dockerMiscService
 * Service in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .service('dockerMiscService', function ($http, configurationService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      ping : function(params) {
        return $http.get(configurationService.getService('/_ping'));
      },
      version : function(params) {
        return $http.get(configurationService.getService('/version'));
      },
      info : function(params) {
        return $http.get(configurationService.getService('/info'));
      },
      events : function(since){
        return $http.get(configurationService.getService('/events?since='+since));
      },
      start : function(params){
        return $http.get(configurationService.getService({
          host: 'localhost',
          port: 8080
        }, '/startDockerService'));
      },
      stop : function(params){
        return $http.get(configurationService.getService({
          host: 'localhost',
          port: 8080
        }, '/stopDockerService'));
      }
    };
  });

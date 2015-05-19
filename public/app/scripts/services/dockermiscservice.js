'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.dockerMiscService
 * @description
 * # dockerMiscService
 * Service in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .service('dockerMiscService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      ping : function(params) {
        return $http.get('http://localhost:4243/_ping');
      },
      version : function(params) {
        return $http.get('http://localhost:4243/version');
      },
      info : function(params) {
        return $http.get('http://localhost:4243/info');
      },
      startDocker : function(params){
        return $http.get('http://localhost:8080/startDockerService');
      },
      stopDocker : function(params){
        return $http.get('http://localhost:8080/stopDockerService');
      }
    };
  });

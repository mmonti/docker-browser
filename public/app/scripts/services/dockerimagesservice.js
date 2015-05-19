'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.dockerImagesService
 * @description
 * # dockerImagesService
 * Service in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .service('dockerImagesService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    return {
      images : function(params) {
        return $http.get('http://localhost:4243/images/json');
      },
    };
  });

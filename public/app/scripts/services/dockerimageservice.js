'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.dockerImagesService
 * @description
 * # dockerImagesService
 * Service in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .service('dockerImageService', function ($http, configurationService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    return {
      images : function() {
        return $http.get(configurationService.getService('/images/json'), {
          transformResponse: function (response, headers) {
            var getName = function() {
              return (this.RepoTags[0]).substring(0, (this.RepoTags[0]).indexOf(':'));
            };            
            var data = JSON.parse(response);
            for (var idx in data) {
              data[idx].name = getName;
            }
            return data;
          }
        });
      },
      inspect : function(name) {
        return $http.get(configurationService.getService('/images/'+name+'/json'));
      },
      history : function(name) {
        return $http.get(configurationService.getService('/images/'+name+'/json'));
      },
      delete : function(name) {
        return $http.delete(configurationService.getService('/images/'+name));
      },
      search : function(term) {
        return $http.get(configurationService.getService('/images/search?term='+term));
      },
    };
  });

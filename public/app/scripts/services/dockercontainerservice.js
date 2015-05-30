'use strict';

/**
 * @ngdoc service
 * @name dockerBrowserApp.dockerContainerService
 * @description
 * # dockerContainerService
 * Service in the dockerBrowserApp.
 */
angular.module('dockerBrowserApp')
  .service('dockerContainerService', function ($http, configurationService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    return {
      containers : function() {
        return $http.get(configurationService.getService('/containers/json'));
      },
      start : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/start'));
      },
      stop : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/stop'));
      },
      restart : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/restart'));
      },
      kill : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/kill'));
      },
      pause : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/pause'));
      },
      unpause : function(id) {
        return $http.post(configurationService.getService('/containers/'+id+'/unpause'));
      },
      rename : function(id, name) {
        return $http.post(configurationService.getService('/containers/'+id+'/rename?name='+name));
      },
      inspect : function(id) {
        return $http.get(configurationService.getService('/containers/'+id+'/json'));
      },
      logs : function(id, err, out, timestamp, follow, tail) {
        var endpoint = configurationService.getService('/containers/'+id+'/logs?stderr='+err+'&stdout='+out+'&timestamps='+timestamp+'&follow='+follow);
        return $http({
            url : endpoint,
            method : 'GET',
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        });
      }
    };
  });

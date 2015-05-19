/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc function
 * @name dockerBrowserApp.controller:dockerMainController
 * @description
 * # dockerMainController
 * Controller of the dockerBrowserApp
 */
angular.module('dockerBrowserApp')
  .controller('dockerMainController', function ($scope, $location, dockerMiscService, dockerImagesService) {
    dockerMiscService.info()
    .success(function(response){
      $scope.info = response;
    })
    .error(function(){      
    });
    dockerMiscService.version()
    .success(function(response){
      $scope.version = response;
    })
    .error(function(){
    });
    dockerImagesService.images()
    .success(function(response){
      $scope.images = response;
    })
    .error(function(){
    });
});

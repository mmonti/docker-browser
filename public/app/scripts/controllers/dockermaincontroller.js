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
  .controller('dockerMainController', function ($scope, $rootScope, $location, dockerMiscService, dockerImageService, dockerContainerService) {
    
    $scope.loading = true;
    $scope.images = [];
    $scope.containers = [];
    $scope.info = {};
    $scope.version = {};
    
    var log = function(response) {
      console.log(response);
    };
    
    // Docker Info.
    var checkInfo = function(params) {
      dockerMiscService.info()
      .success(function(response){
        $scope.info = response;
      }).error(log);      
    }
    
    // Docker Version.
    var checkVersion = function(params) {
      dockerMiscService.version()
      .success(function(response){
        $scope.version = response;
      }).error(log);
    }

    // Images Containers.
    var checkImages = function(params) {
      dockerImageService.images()
      .success(function(response){
        if ($scope.images.length != response.length) {
          $scope.images = response;  
        }
      }).error(log);
    };
    
    // Running Containers.
    var checkContainers = function(params) {
      dockerContainerService.containers()
      .success(function(response){
        $scope.containers = response;
         if ($scope.containers.length != response.length) {
          $scope.containers = response;  
        }
      }).error(log);
    };
    
    $scope.startContainer = function(id) {
      dockerContainerService.start(id)
      .success(function(response){
        console.log(response);
        $rootScope.$broadcast('docker:container:start', response);
      }).error(log);
    };
    
    $scope.stopContainer = function(id) {
      dockerContainerService.stop(id)
      .success(function(response){
        console.log(response);
        $rootScope.$broadcast('docker:container:stop', response);
      }).error(log);
    };
    
    // Refresh the status of images and containers.
    $scope.$on('docker:ping:success', function(){
      checkInfo();
      checkVersion();
      checkImages();
      checkContainers();
      
      $scope.loading = false;
    });
    
    $scope.$on('docker:container:start', function(){
      checkContainers();
    });
    $scope.$on('docker:container:stop', function(){
      checkContainers();
    });
  
});

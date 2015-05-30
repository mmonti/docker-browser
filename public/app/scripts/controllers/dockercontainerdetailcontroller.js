/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc function
 * @name dockerBrowserApp.controller:dockerContainerDetailController
 * @description
 * # dockerContainerDetailController
 * Controller of the dockerBrowserApp
 */
angular.module('dockerBrowserApp')
  .controller('dockerContainerDetailController', function ($scope, $rootScope, $stateParams, $location, Oboe, rx, dockerContainerService) {
    
    $scope.container = {};
    
    var log = function(response) {
      console.log(response);
    };
    
    if (!$stateParams.id) {
      console.log("Container id wasn't specified");
      return;
    }
  
  
  dockerContainerService.logs($stateParams.id, 1, 1, 1, 1).success(function(x){
    console.log(x);
  }).error(log);
    rx.Observable
      .fromPromise(dockerContainerService.logs($stateParams.id, 1, 1, 1, 1))
      .subscribe(
        function (x) {
            console.log('Next: ' + x);
        },
        function (err) {
            console.log('Error: ' + err);
        },
        function () {
            console.log('Completed');
        }
      ); 
    
    // Docker Info.
    var inspectContainer = function(id) {
      dockerContainerService.inspect(id)
      .success(function(response){
        $scope.container = response;
      }).error(log);      
    };
    
    inspectContainer($stateParams.id);
    
});

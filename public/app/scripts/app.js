/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc overview
 * @name dockerBrowserApp
 * @description
 * # dockerBrowserApp
 *
 * Main module of the application.
 */
angular
  .module('dockerBrowserApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/start-view.html',
        controller: 'dockerStartController'
      })
      .when('/main', {
        templateUrl: 'views/main-view.html',
        controller: 'dockerMainController'
      })
      .otherwise({
        redirectTo: '/'
      });
      
  }).run(function($rootScope, $route, $location, $interval, dockerMiscService) {
      
      $rootScope.startDocker = function(params){
        dockerMiscService.startDocker()
        .success(function(params){
          $location.path('/main');
        })
        .error(function(params) {
          console.log('error starting docker service');
        });
      };
      
      $rootScope.stopDocker = function(params){
        dockerMiscService.stopDocker()
        .success(function(params){
          $location.path('/');  
        })
        .error(function(params) {
          console.log('error stopping docker service');
        });
      };
    
      var dockerHealth = function(params) {
        try {
          console.log('pinging docker daemon');
          dockerMiscService.ping()
          .success(function(params){
            $rootScope.service = true;
            if ($location.path() == '/') {
              $location.path('/main');
            }
          })
          .error(function(params){
            $rootScope.service = false;
            $location.path('/');
          });  
        } catch (error) {
          console.log('error calling ping() service');
        }
      };
      $interval(dockerHealth, 5000);
  });
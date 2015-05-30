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
    'ngTouch',
    'ui.router',
    'ngOboe',
    'rx'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/start");
    $urlRouterProvider.when('/', "/start");
    // Now set up the states
    $stateProvider
      .state('start', {
        url: '/start',
        templateUrl: 'views/start-view.html',
        controller: 'dockerStartController'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'views/main-view.html',
        controller: 'dockerMainController'
      })
      .state('containerDetail', {
        url: '/container/:id',
        templateUrl: 'views/container-detail-view.html',
        controller: 'dockerContainerDetailController'
      })
      ;
  })
  .run(function($rootScope, $route, $location, $interval, dockerMiscService) {
      
      $rootScope.startDocker = function(params){
        dockerMiscService.start()
        .success(function(params){
          $location.path('/main');
        })
        .error(function(params) {
          console.log('error starting docker service');
        });
      };
      
      $rootScope.stopDocker = function(params){
        dockerMiscService.stop()
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
            $rootScope.$broadcast('docker:ping:success', params);
            
            if ($location.path() == '/' || $location.path() == '/start') {
              $location.path('/main');
            }
          })
          .error(function(params){
            $rootScope.$broadcast('docker:ping:error', params);
            
            $rootScope.service = false;
            $location.path('/');
          });  
        } catch (error) {
          console.log('error calling ping() service');
        }
      };
      $interval(dockerHealth, 5000);
  });
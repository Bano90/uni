(function () {
    'use strict';
    angular
    .module('app')
    .config(ConfigFunction);
    
    function ConfigFunction($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
  
      //Add state to all routes
  
      $stateProvider.state('start', {
        url: '/',
        templateUrl: './app/components/start/start.html',
        controller: 'StartController',
        controllerAs: 'vm'
      });
  
    }
    ConfigFunction.$inject = ['$urlRouterProvider', '$stateProvider'];
    //return ConfigFunction;
  })();
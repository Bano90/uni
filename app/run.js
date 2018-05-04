(function () {
    'use strict';
  
    angular
      .module('app')
      .run(runFunction);
  
    runFunction.$inject = ['$state', '$rootScope'];
    function runFunction($state, $rootScope,) {
      var vm = this;
  
      activate();
  
      ////////////////
  
      function activate() {}
    }
  })();
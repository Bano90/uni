(function () {
    'use strict';

    angular
        .module('app')
        .factory('WordService', WordService);

    WordService.$inject = ['$http'];
    function WordService($http) {
        var service = {
            getAll: getAll,
            post: post,
            put: put,
            erase: erase
        };

        return service;

        ////////////////
        function getAll() {
            var req = {
                method: 'GET',
                url: 'app/components/php/words/allwords'
            };
            return $http(req);
        }
        function post(data) {
            var req = {
                method: 'POST',
                url: 'app/components/php/words/word/' + data.id,
                data: data
            };
            return $http(req);
        }
        function put(data) {
            var req = {
                method: 'PUT',
                url: 'app/components/php/words/word/' + data.id,
                data: data
            };
            return $http(req);
        }
        function erase(id) {
            var request = {
                method: "DELETE",
                url: "app/components/php/words/word/" + id
            };
            return $http(request);
        }
    }
})();
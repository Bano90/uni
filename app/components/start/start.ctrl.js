(function () {
    'use strict';

    angular
        .module('app')
        .controller('StartController', StartController);

    StartController.$inject = ['$state', '$rootScope', '$filter', 'WordService'];
    function StartController($state, $rootScope, $filter, WordService) {
        var vm = this;
        vm.categories = ["animal", "fruit", "school"];
        vm.createword = {};
        vm.load = load;
        vm.save = save;
        vm.erase = erase;
        vm.show = false;
        vm.showtable=false;

        activate();

        ////////////////

        function load() {
            vm.words = [];
            /*WordService.getAll().then(function (response) {
                vm.words = response.data;
                console.log(vm.words);
                vm.showtable=true;
            });*/
            vm.words = interdictionary;
            console.log(vm.words);
            vm.showtable=true;
        }

        function save() {
            vm.createword.id = new Date().getTime();
            vm.createword.category = vm.category;
            vm.createword.english = vm.english;
            vm.createword.hungarian = vm.hungarian;
            vm.createword.german = vm.german;

            WordService.post(vm.createword).then(function (response) {
                vm.createword = {};
                vm.show = false;
            });
        }

        function erase(id, index) {
            WordService.erase(id).then(function (response) {
                vm.words.splice(index, 1);
            });
        }

        var interdictionary = [
            { id: 1, category: "animal", english: "dog", hungarian: "kutya", german: "der Hund" },
            { id: 2, category: "animal", english: "duck", hungarian: "kacsa", german: "die Ente" },
            { id: 3, category: "fruit", english: "lime", hungarian: "citrom", german: "die Zitrone" },
            { id: 4, category: "school", english: "pen", hungarian: "toll", german: "der Kugelschrieber" },
            { id: 5, category: "school", english: "book", hungarian: "könyv", german: "das Buch" },
        ]

        function activate() {

        }
    }
})();
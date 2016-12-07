'use strict';

angular.module('yo', [
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        });
        
});

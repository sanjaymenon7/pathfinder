'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.question',
  'timer'
]).
config(['$locationProvider', '$routeProvider','$resourceProvider', function($locationProvider, $routeProvider,$resourceProvider ) {
  $locationProvider.hashPrefix('!');
 /* $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });*/

  $routeProvider.otherwise({redirectTo: '/question'});

  $resourceProvider.defaults.stripTrailingSlashes = true
}]);
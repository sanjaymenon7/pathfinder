'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope',function($scope) {
  $scope.message="";
  $scope.message="test";
}]);
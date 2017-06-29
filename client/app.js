var app = angular.module('myApp',['ngRoute','ngResource']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
    .when('/',{
        templateUrl: 'views/welcome.html'
    }).when('/chirps',{
        templateUrl: 'views/chirps.html',
        controller: 'chirpsCtrl'
    }).when('/chirps/:id',{
        templateUrl: 'views/chirp.html',
        controller: 'chirpCtrl'
    }).when('/chirps/:id/update',{
        templateUrl: 'views/updateChirp.html',
        controller: 'updateChirpCtrl'
    }).otherwise({redirectTo: '/'});
}])
'use strict';

/**
 * @ngdoc overview
 * @name appAngularApp
 * @description
 * # appAngularApp
 *
 * Main module of the application.
 */
angular
  .module('appAngularApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize','ngTouch'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:id', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

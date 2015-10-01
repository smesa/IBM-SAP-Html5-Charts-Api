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
  .module('appAngularApp', ['ngRoute'])
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

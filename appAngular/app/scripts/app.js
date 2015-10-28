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
  .module('appAngularApp', ['ngRoute', 'LocalStorageModule'])
  .config(function ($routeProvider,localStorageServiceProvider) {
    $routeProvider
      .when('/:id', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      })
      .otherwise({
        redirectTo: '/'
      });

      localStorageServiceProvider
      .setPrefix('IBM-Charts')
      .setStorageType('sessionStorage')
      .setNotify(true, true);
  });

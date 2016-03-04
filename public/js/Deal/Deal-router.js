'use strict';

angular.module('etopsapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Deals', {
        templateUrl: 'views/Deal/Deals.html',
        controller: 'DealController',
        resolve:{
          resolvedDeal: ['Deal', function (Deal) {
            return Deal.query();
          }]
        }
      })
    }]);

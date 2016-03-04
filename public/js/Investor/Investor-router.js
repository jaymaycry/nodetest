'use strict';

angular.module('etopsapp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/Investors', {
        templateUrl: 'views/Investor/Investors.html',
        controller: 'InvestorController',
        resolve:{
          resolvedInvestor: ['Investor', function (Investor) {
            return Investor.query();
          }]
        }
      })
    }]);

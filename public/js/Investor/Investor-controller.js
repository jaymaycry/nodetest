'use strict';

angular.module('etopsapp')
  .controller('InvestorController', ['$scope', '$modal', 'resolvedInvestor', 'Investor',
    function ($scope, $modal, resolvedInvestor, Investor) {

      $scope.Investors = resolvedInvestor;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.Investor = Investor.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Investor.delete({id: id},
          function () {
            $scope.Investors = Investor.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Investor.update({id: id}, $scope.Investor,
            function () {
              $scope.Investors = Investor.query();
              $scope.clear();
            });
        } else {
          Investor.save($scope.Investor,
            function () {
              $scope.Investors = Investor.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.Investor = {
          
          "family_name": "",
          
          "given_name": "",
          
          "nationality": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var InvestorSave = $modal.open({
          templateUrl: 'Investor-save.html',
          controller: 'InvestorSaveController',
          resolve: {
            Investor: function () {
              return $scope.Investor;
            }
          }
        });

        InvestorSave.result.then(function (entity) {
          $scope.Investor = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('InvestorSaveController', ['$scope', '$modalInstance', 'Investor',
    function ($scope, $modalInstance, Investor) {
      $scope.Investor = Investor;

      

      $scope.ok = function () {
        $modalInstance.close($scope.Investor);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

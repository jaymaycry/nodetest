'use strict';

angular.module('etopsapp')
  .controller('DealController', ['$scope', '$modal', 'resolvedDeal', 'Deal',
    function ($scope, $modal, resolvedDeal, Deal) {

      $scope.Deals = resolvedDeal;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.Deal = Deal.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Deal.delete({id: id},
          function () {
            $scope.Deals = Deal.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Deal.update({id: id}, $scope.Deal,
            function () {
              $scope.Deals = Deal.query();
              $scope.clear();
            });
        } else {
          Deal.save($scope.Deal,
            function () {
              $scope.Deals = Deal.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.Deal = {
          
          "name": "",
          
          "target_return": "",
          
          "minimum_investment_amount": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var DealSave = $modal.open({
          templateUrl: 'Deal-save.html',
          controller: 'DealSaveController',
          resolve: {
            Deal: function () {
              return $scope.Deal;
            }
          }
        });

        DealSave.result.then(function (entity) {
          $scope.Deal = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('DealSaveController', ['$scope', '$modalInstance', 'Deal',
    function ($scope, $modalInstance, Deal) {
      $scope.Deal = Deal;

      

      $scope.ok = function () {
        $modalInstance.close($scope.Deal);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

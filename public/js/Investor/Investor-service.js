'use strict';

angular.module('etopsapp')
  .factory('Investor', ['$resource', function ($resource) {
    return $resource('investors/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);

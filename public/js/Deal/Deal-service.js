'use strict';

angular.module('etopsapp')
  .factory('Deal', ['$resource', function ($resource) {
    return $resource('deals/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);

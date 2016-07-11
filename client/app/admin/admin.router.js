'use strict';

angular.module('apuqaApp.admin')
  .config(function($stateProvider) {
    $stateProvider.state('admin', {
      url: '/users',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    });
  });

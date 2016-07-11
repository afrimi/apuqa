'use strict';

angular.module('apuqaApp.auth', ['apuqaApp.constants', 'apuqaApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

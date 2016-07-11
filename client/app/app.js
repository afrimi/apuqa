'use strict';

angular.module('apuqaApp', [
	'apuqaApp.auth', 
	'apuqaApp.admin', 
	'apuqaApp.constants', 
	'ngCookies',
    'ngResource', 
    'ngSanitize', 
    'btford.socket-io', 
    'ui.router', 
    'ui.bootstrap',
    'validation.match',
    'ui.pagedown',
    'ngTagsInput',
    'ngMessages',
    'infinite-scroll',
    '720kb.socialshare',
    'ngDialog'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });

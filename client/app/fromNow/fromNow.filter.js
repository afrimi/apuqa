'use strict';

angular.module('apuqaApp')
  .filter('fromNow', function () {
    return function (input) {
      return moment(input).locale(window.navigator.language).fromNow();
    };
  });

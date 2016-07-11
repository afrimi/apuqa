'use strict';

class NavbarController {
  //end-non-standard

isCollapsed = true;

  //start-non-standard
  constructor(Auth, $state) {
  	this.menu = [
      {
        'title': 'All',
        'link': function(){return '/';},
        'show': function(){return true;},
      },
      {
        'title': 'Mine',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id;},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'Starred',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id + '/starred';},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'Unanswered',
        'link': function(){return '/unanswered';},
        'show': function(){return true;},
      },
      {
        'title': 'Users',
        'link': function(){return '/users'},
        'show': Auth.isAdmin,
      },
    ];

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.search = function(keyword) {
      $state.go('main', {keyword: keyword}, {reload: true});
    };
    
  }

}

angular.module('apuqaApp')
  .controller('NavbarController', NavbarController);

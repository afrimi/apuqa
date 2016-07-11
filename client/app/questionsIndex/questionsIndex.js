'use strict';

angular.module('apuqaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?keyword',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function(){return {};}
        },
      })
      .state('starredQuestionsIndex', {
        url: '/users/:userId/starred',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {
              $or: [
                {'stars': $stateParams.userId},
                {'answers.stars': $stateParams.userId},
                {'comments.stars': $stateParams.userId},
                {'answers.comments.stars': $stateParams.userId},
              ]
            };
          }
        },
      })
      .state('userQuestionsIndex', {
        url: '/users/:userId',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {user: $stateParams.userId};
          }
        },
      })
      .state('unAnsweredQuestionsIndex', {
        url: '/unanswered',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function(){

            return {
              $or: [
              {'answers.isSolved': { $ne: "true" }},
              {'answers':[]},
              ]
            };
          }
        },
      });

  });

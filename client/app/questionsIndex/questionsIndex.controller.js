'use strict';


angular.module('apuqaApp')
.controller('QuestionsIndexCtrl', function ($scope, $http, $location, Auth, query, socket) {
    var keyword = $location.search().keyword;
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    $scope.busy = true;
    $scope.noMoreData = false;

    $http.get('/api/questions', {params: {query: query}}).success(function(questions) {
      $scope.questions = questions;
      socket.syncUpdates('question', $scope.questions);
      if($scope.questions.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('question');
      });

    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.questions[$scope.questions.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get('/api/questions', {params: {query: pageQuery}}).success(function(questions){
        $scope.questions = $scope.questions.concat(questions);
        $scope.busy = false;
        if(questions.length === 0){
          $scope.noMoreData = true;
        }
      });
    };
    
    $scope.isStar = function(obj){
      return Auth.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    };

    $scope.isSelected = function(obj){
      for(var i=0; i < obj.answers.length; i++){
         if(obj.answers[i].isSolved === true){
          return true;
         }
      }
    };

  });

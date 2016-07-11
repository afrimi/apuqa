'use strict';

angular.module('apuqaApp')
  .controller('QuestionsShowCtrl', function ($scope, $http, $stateParams, Auth, $location) {
  
  


    var loadQuestions = function(){
      $http.get('/api/questions/' + $stateParams.id).success(function(question) {
        $scope.question = question;
      });
    };
    loadQuestions();

    $scope.newAnswer = {};
    $scope.submitAnswer = function() {
      $http.post('/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function(){
        loadQuestions();
        $scope.newAnswer = {};
      });
    };
    $scope.deleteQuestion = function() {
      $http.delete('/api/questions/' + $stateParams.id).success(function(){
        $location.path('/');
      });
    };
    $scope.deleteAnswer = function(answer) {
      $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function(){
        loadQuestions();
      });
    };
    $scope.updateQuestion = function() {
      $http.put('/api/questions/' + $stateParams.id, $scope.question).success(function(){
        loadQuestions();
      });
    };
    $scope.updateAnswer = function(answer) {
      $http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id, answer).success(function(){
        loadQuestions();
      });
    };
    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

    $scope.isAdmin = Auth.isAdmin;
    $scope.isLecturer = Auth.isLecturer;

    $scope.newComment = {};
    $scope.submitComment = function() {
      $http.post('/api/questions/' + $stateParams.id + '/comments', $scope.newComment).success(function(){
        loadQuestions();
        $scope.newComment = {};
        $scope.editNewComment = false;
      });
    };
    $scope.submitAnswerComment = function(answer) {
      $http.post('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments', answer.newAnswerComment).success(function(){
        loadQuestions();
      });
    };
    $scope.deleteComment = function(comment) {
      $http.delete('/api/questions/' + $stateParams.id + '/comments/' + comment._id).success(function(){
        loadQuestions();
      });
    };
    $scope.deleteAnswerComment = function(answer, answerComment) {
      $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id).success(function(){
        loadQuestions();
      });
    };
    $scope.updateComment = function(comment) {
      $http.put('/api/questions/' + $stateParams.id + '/comments/' + comment._id, comment).success(function(){
        loadQuestions();
      });
    };
    $scope.updateAnswerComment = function(answer, answerComment) {
      $http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment).success(function(){
        loadQuestions();
      });
    };

    $scope.isStar = function(obj){
      return Auth.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(Auth.getCurrentUser()._id)!==-1;
    };
    
    $scope.star = function(subpath) {
      $http.put('/api/questions/' + $scope.question._id + subpath + '/star').success(function(){
        loadQuestions();
      });
    };

    $scope.unstar = function(subpath) {
      $http.delete('/api/questions/' + $scope.question._id + subpath + '/star').success(function(){
        loadQuestions();
      });
    };

    $scope.isSelected = function(obj){
      return  obj && obj.isSolved!==false;
    };

  //   $scope.hasAnswer = function() {
  //     for (var i = 0; i < $scope.question.answers.length; i++) {
  //         if ($scope.question.answers[i].isSolved === true) {
  //             //return true;
  //             $http.delete('/api/questions/' + $scope.question._id + /answers/ + '/solved').success(function() {
  //                 loadQuestions();
  //             });
  //         }
  //     }
  // };


    $scope.selectAnswer = function(subpath) {
      $http.put('/api/questions/' + $scope.question._id + subpath + '/solved').success(function(){
        loadQuestions();
      });
    };
    $scope.unselectAnswer = function(subpath) {
      $http.delete('/api/questions/' + $scope.question._id + subpath + '/solved').success(function(){
        loadQuestions();
      });
    };

  });

'use strict';

angular.module('yo')
.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    isLogin();
    function isLogin(){
      $http.get("/api/is_auth")
      .success(function(data, status, headers, config){
        if(data == true){
          $state.go("home");
        } else {
          $state.go("login");
        }
      })
    }
  }])

  .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  	$http.get('/api/getRecipes').
	    success(function(data, status, headers, config) {
	    console.log(data);
    });
  }])
  
  ;

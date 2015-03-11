angular.module("evalApp").controller("loginController",
["$scope", "$rootScope", "$state", "LoginResource", 
function ($scope, $rootScope, $state, LoginResource){
	$scope.errorMessage = "";
	$scope.nickname = "";
	$scope.password = "";
	$scope.message = "Hello from Login";

	$scope.login = function(){
		if($scope.nickname === "" || $scope.password === ""){
			$scope.errorMessage = "Please input nickname and password";
		}
		else{
			LoginResource.login({user: $scope.nickname, pass: $scope.password}).then(function(data){
				console.log(data);
			});
		}
	};

	$scope.evals = function(){
		$state.go("evaluations");
	};
}]);
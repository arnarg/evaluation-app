angular.module("evalApp").controller("loginController",
["$scope", "$rootScope", "$state", 
function ($scope, $rootScope, $state){
	$scope.errorMessage = "";
	$scope.nickname = "";
	$scope.password = "";
	$scope.message = "Hello from Login";

	$scope.login = function(){
		if($scope.nicname === "" || $scope.password === ""){
			$scope.errorMessage = "Please input nickname and password";
		}
	};
}]);
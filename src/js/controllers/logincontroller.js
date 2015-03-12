angular.module("evalApp").controller("loginController",
["$scope", "$rootScope", "$state", "LoginResource", "userData", 
function ($scope, $rootScope, $state, LoginResource, userData){
	$scope.errorMessage = "";
	$scope.nickname = "";
	$scope.password = "";

	$scope.login = function(){
		if($scope.nickname === "" || $scope.password === ""){
			$scope.errorMessage = "Please input nickname and password";
		}
		else{
			LoginResource.login({user: $scope.nickname, pass: $scope.password}).then(function(data){
				console.log(data);
				userData.token = data.data.Token;
				userData.username = data.data.User.FullName;
				userData.role = data.data.User.Role;
				if(userData.role === "student"){
					$state.go("evaluationsStudent");
				}
				else if(userData.role === "admin"){
					$state.go("evaluationsAdmin");
				}
			});
		}
	};
}]);
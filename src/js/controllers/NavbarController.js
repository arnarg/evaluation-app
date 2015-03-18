angular.module("evalApp").controller("NavbarController", ["$scope", "$state", "userData",
function($scope, $state, userData) {
	$scope.loggedin = false;

	$scope.$on("login", function(e) {
		console.log(userData);
		if (userData.role === "admin") {
			$scope.navigation = [
				{
					Title: "Home",
					State: "evaluationsAdmin",
					Active: true
				},
				{
					Title: "Create template",
					State: "template",
					Active: false
				},
				{
					Title: "Create evaluation",
					State: "evaluation",
					Active: false
				}
			];
		}
		// else userData.role === student
		else {
			$scope.navigation = undefined;
		}

		$scope.username = userData.username;
		$scope.loggedin = true;
	});

	$scope.logout = function() {
		userData.token = undefined;
		userData.username = undefined;
		userData.role = undefined;
		$scope.loggedin = false;
		$scope.navigation = undefined;
		$state.go("login");
	};
}]);

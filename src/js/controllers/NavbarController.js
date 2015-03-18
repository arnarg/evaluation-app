angular.module("evalApp").controller("NavbarController", ["$scope", "$state", "userData",
function($scope, $state, userData) {
	$scope.loggedin = false;

	$scope.$on("login", function(e) {
		console.log(userData);
		if (userData.role === "admin") {
			$scope.navigation = [
				{
					Title: "Home",
					State: "evaluationsAdmin"
				},
				{
					Title: "Create template",
					State: "template"
				},
				{
					Title: "Create evaluation",
					State: "evaluation"
				}
			];
		}
		// else userData.role === student
		else {
			$scope.navigation = [
				{
					Title: "Home",
					State: "evaluationsStudent"
				}
			];
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

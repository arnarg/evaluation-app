angular.module("evalApp").controller("evaluationsController",
["$scope", "$rootScope", "$state", "MyResource", "userData", 
function ($scope, $rootScope, $state, MyResource, userData){
	$scope.errorMessage = "";
	$scope.courses = [];
	console.log("loginToken in evals: " + userData.token);
	console.log("username in evals: " + userData.username);
	console.log("role in evals: " + userData.role);
	MyResource.getCourses(userData.token).then(function(data){
		console.log("Courses for this user:");
		console.log(data);
		$scope.courses = data.data;
	});
}]);
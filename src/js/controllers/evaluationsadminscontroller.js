angular.module("evalApp").controller("evaluationsAdminController",
["$scope", "$rootScope", "$state", "TemplatesResource", "EvaluationsResource", "userData", 
function ($scope, $rootScope, $state, TemplatesResource, EvaluationsResource, userData){
	$scope.errorMessage = "";
	$scope.evaluations = [];
	$scope.templates = [];
	console.log("username in evals: " + userData.username);
	console.log("role in evals: " + userData.role);
	TemplatesResource.getTemplates(userData.token).then(function(data){
		console.log("Templates:");
		console.log(data);
		$scope.templates = data.data;
	});
	EvaluationsResource.getEvaluations(userData.token).then(function(data){
		console.log("Evaluations for this user:");
		console.log(data);
		$scope.evaluations = data.data;
	});
}]);
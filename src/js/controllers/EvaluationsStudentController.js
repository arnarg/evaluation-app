angular.module("evalApp").controller("EvaluationsStudentController",
["$scope", "$rootScope", "$state", "MyResource", "userData", 
function ($scope, $rootScope, $state, MyResource, userData){
	$scope.errorMessage = "";
	$scope.courses = [];
	$scope.evaluations = [];
	MyResource.getCourses(userData.token).then(function(data){
		$scope.courses = data.data;
	});

	MyResource.getEvaluations(userData.token).then(function(data){
		console.log("Evaluations for this user:");
		console.log(data);
		$scope.evaluations = data.data;
	});

	$scope.openEvaluation = function(course, semester, id){
		$state.go("evaluationStudent", { course: course, semester: semester, id: id });
	};
}]);
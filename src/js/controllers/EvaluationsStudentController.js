angular.module("evalApp").controller("EvaluationsStudentController",
["$scope", "$rootScope", "$state", "MyResource", "userData", 
function ($scope, $rootScope, $state, MyResource, userData){
	$scope.courses = [];
	$scope.evaluations = [];
	$scope.getCourses = function() {
		MyResource.getCourses(userData.token).then(function(data){
			$scope.courses = data.data;
		});
	};
	$scope.getEvaluations = function() {
		MyResource.getEvaluations(userData.token).then(function(data){
			$scope.evaluations = data.data;
		});
	};

	$scope.openEvaluation = function(course, semester, id){
		$state.go("evaluationStudent", { course: course, semester: semester, id: id });
	};

	$scope.getCourses();
	$scope.getEvaluations();
}]);
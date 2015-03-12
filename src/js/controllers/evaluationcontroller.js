angular.module("evalApp").controller("evaluationController",
["$scope", "$rootScope", "$state", "$stateParams",  "CoursesResource", "userData", 
function ($scope, $rootScope, $state, $stateParams, CoursesResource, userData){
	$scope.courseQuestions = [];
	$scope.teacherQuestions = [];
	$scope.introText = "";
	$scope.evalTitle = "";
	$scope.course = $stateParams.course;
	CoursesResource.getEvaluation(userData.token, $stateParams.course, $stateParams.semester, $stateParams.id)
	.then(function(data){
		console.log(data);
		$scope.courseQuestions = data.data.CourseQuestions;
		$scope.teacherQuestions = data.data.TeacherQuestions;
		$scope.introText = data.data.IntroText;
		$scope.evalTitle = data.data.Title;
	});
}]);
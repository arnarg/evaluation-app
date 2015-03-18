angular.module("evalApp").controller("evaluationStudentController",
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

	$scope.submitEvaluation = function(){
		var QuestionAnswers = [];

		$scope.courseQuestions.forEach(function(question){
			QuestionAnswers.push({
				QuestionID: question.ID,
				TeacherSSN: undefined,
				Value: question.Answer
			});
			console.log(question);
		});

		$scope.teacherQuestions.forEach(function(question){
			QuestionAnswers.push({
				QuestionID: question.ID,
				TeacherSSN: undefined,
				Value: question.Answer
			});
		});

		CoursesResource.saveEvaluation(userData.token, $stateParams.course, $stateParams.semester, $stateParams.id, QuestionAnswers)
		.then(function(data){
			console.log("SAVE EVALUATION:");
			console.log(data);
			$state.go("evaluationsStudent");		
		}).catch(function(e) {
			console.log("Something went wrong with saving the evaluation");
		});

	};

}]);
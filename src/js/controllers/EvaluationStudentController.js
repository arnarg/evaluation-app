angular.module("evalApp").controller("EvaluationStudentController",
["$scope", "$state", "$stateParams",  "CoursesResource", "userData", 
function ($scope, $state, $stateParams, CoursesResource, userData){
	$scope.courseQuestions = [];
	$scope.teachers = [];
	$scope.introText = "";
	$scope.evalTitle = "";
	$scope.course = $stateParams.course;

	CoursesResource.getTeachers(userData.token, $stateParams.course, $stateParams.semester)
	.then(function(data){
		$scope.teachers = data.data;
	});

	CoursesResource.getEvaluation(userData.token, $stateParams.course, $stateParams.semester, $stateParams.id)
	.then(function(data){
		$scope.courseQuestions = data.data.CourseQuestions;
		for(var i = 0; i < $scope.teachers.length; ++i){
			$scope.teachers[i].teacherQuestions = angular.copy(data.data.TeacherQuestions);
			for(var k = 0; k < $scope.teachers[i].teacherQuestions.length; ++k){
				$scope.teachers[i].teacherQuestions[k].SSN = $scope.teachers[i].SSN;
			}
		}
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

		for(var i = 0; i < $scope.teachers.length; ++i){
			for(var k = 0; k < $scope.teachers[i].teacherQuestions.length; ++k){
				QuestionAnswers.push({
					QuestionID: $scope.teachers[i].teacherQuestions[k].ID,
					TeacherSSN: $scope.teachers[i].SSN,
					Value: $scope.teachers[i].teacherQuestions[k].Answer
				});
			}
		}
		
		CoursesResource.saveEvaluation(userData.token, $stateParams.course, $stateParams.semester, $stateParams.id, QuestionAnswers)
		.then(function(data){
			$state.go("evaluationsStudent");
		}).catch(function(e) {
			console.log("Something went wrong with saving the evaluation");
		});
	};
}]);
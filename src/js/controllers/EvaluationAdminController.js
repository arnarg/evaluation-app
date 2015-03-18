angular.module("evalApp").controller("EvaluationAdminController",
["$scope", "$stateParams",  "EvaluationsResource", "userData", "toastr",  
function ($scope, $stateParams, EvaluationsResource, userData, toastr){
	$scope.title = "";
	$scope.titleEN = "";
	$scope.courses = [];
	$scope.selectedOption = { };

	$scope.getEvaluation = function() {
		EvaluationsResource.getEvaluation(userData.token, $stateParams.id).then(function(data){
			$scope.title = data.data.TemplateTitle;
			$scope.titleEN = data.data.TemplateTitleEN;
			$scope.courses = data.data.Courses;
			if($scope.courses.length === 0){
				toastr.error("No students answered this evaluation");
			}
			else {
				$scope.selectedOption = $scope.courses[0];
				fillScopeData();
			}
		});
	};

	$scope.getEvaluation();

	$scope.getCourseResults = function(id){
		console.log(id);
		$scope.courses.forEach(function(course){
			if(course.CourseID === id){
				$scope.selectedOption = course;
			}
		});
		console.log($scope.selectedOption);
		fillScopeData();
	};

	function fillScopeData() {
		var i = 0;
		$scope.selectedOption.Questions.forEach(function(question){
			var data = [];
			var datamin = [];
			var labels = [];
			if(question.OptionsResults !== null){
				question.OptionsResults.forEach(function(option){
					datamin.push(option.Count);
					labels.push(option.AnswerText);
				});
			}
			data.push(datamin);
			$scope.selectedOption.Questions[i].data = data;
			$scope.selectedOption.Questions[i].labels = labels;
			++i;
		});
	}

}]);
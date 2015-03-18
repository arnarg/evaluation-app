angular.module("evalApp").controller("EvaluationAdminController",
["$scope", "$rootScope", "$state", "$stateParams",  "EvaluationsResource", "userData", "toastr",  
function ($scope, $rootScope, $state, $stateParams, EvaluationsResource, userData, toastr){
	$scope.title = "";
	$scope.titleEN = "";
	$scope.courses = [];
	$scope.selectedOption = { };
	var nothing = [];
	var answers1 = [];
	answers1.push({ AnswerText: "Not cool", Count: 10 });
	answers1.push({ AnswerText: "Okay", Count: 5 });
	answers1.push({ AnswerText: "Was cool", Count: 30 });
	var questions1 = [];
	questions1.push({ ID: 1, Text: "Describe course", type: "text", TextResults: "It was cool", OptionsResult: nothing});
	questions1.push({ ID: 2, Text: "How cool was teacher?", type: "single", TextResults: "", OptionsResult: answers1 });
	questions1.push({ ID: 3, Text: "How cool was course?", type: "multiple", TextResults: "", OptionsResult: answers1 });
	
	EvaluationsResource.getEvaluation(userData.token, $stateParams.id).then(function(data){
		console.log(data);
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

	$scope.getCourseResults = function(id){
		$scope.courses.forEach(function(course){
			if(course.CourseID === id){
				$scope.selectedOption = course;
			}
		});
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
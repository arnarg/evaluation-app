angular.module("evalApp").controller("evaluationAdminController",
["$scope", "$rootScope", "$state", "$stateParams",  "EvaluationsResource", "userData", 
function ($scope, $rootScope, $state, $stateParams, EvaluationsResource, userData){
	$scope.title = "";
	$scope.titleEN = "";
	$scope.courses = [];
	$scope.selectedOption = { };
	var questions = [];
	questions.push({ ID: 1, Text: "Text1", type: "text", TextResults: "Answer1"});
	questions.push({ ID: 2, Text: "Text2", type: "single", TextResults: ""});
	questions.push({ ID: 3, Text: "Text3", type: "multiple", TextResults: ""});
	EvaluationsResource.getEvaluation(userData.token, $stateParams.id).then(function(data){
		console.log(data);
		$scope.title = data.data.TemplateTitle;
		$scope.titleEN = data.data.TemplateTitleEN;
		$scope.courses.push({ CourseID: "T-427-WEPO", CourseName: "Vefforritun", Questions: questions});
		$scope.courses.push({ CourseID: "T-501-FMAL", CourseName: "Forritunarmál", Questions: questions});
		$scope.courses.push({ CourseID: "T-215-STY1", CourseName: "Stýrikerfi", Questions: questions});
		$scope.selectedOption = $scope.courses[0];
	});

	$scope.changing = function() {
		console.log($scope.selectedOption);
	};
}]);
angular.module("evalApp").controller("evaluationAdminController",
["$scope", "$rootScope", "$state", "$stateParams",  "EvaluationsResource", "userData", 
function ($scope, $rootScope, $state, $stateParams, EvaluationsResource, userData){
	$scope.title = "";
	$scope.titleEN = "";
	$scope.courses = [];
	$scope.selectedOption = { };

	/* Mock data for testing */ 
	var data1 = [];
	var data2 = [];
	var datamin1 = [];
	var datamin2 = [];
	var labels1 = [];
	var answers1 = [];
	answers1.push({ Answer: "Not cool", Count: 10 });
	answers1.push({ Answer: "Okay", Count: 5 });
	answers1.push({ Answer: "Was cool", Count: 30 });
	var answers2 = [];
	answers2.push({ Answer: "Not cool", Count: 20 });
	answers2.push({ Answer: "Okay", Count: 10 });
	answers2.push({ Answer: "Was cool", Count: 5 });
	datamin1.push(answers1[0].Count);
	datamin1.push(answers1[1].Count);
	datamin1.push(answers1[2].Count);
	datamin2.push(answers2[0].Count);
	datamin2.push(answers2[1].Count);
	datamin2.push(answers2[2].Count);
	data1.push(datamin1);
	data2.push(datamin2);
	labels1.push(answers1[0].Answer);
	labels1.push(answers1[1].Answer);
	labels1.push(answers1[2].Answer);
	var questions1 = [];
	questions1.push({ ID: 1, Text: "Describe course", type: "text", TextResults: "It was cool"});
	questions1.push({ ID: 2, Text: "How cool was teacher?", type: "single", TextResults: "", Data: data1, Labels: labels1});
	questions1.push({ ID: 3, Text: "How cool was course?", type: "multiple", TextResults: "", Data: data1, Labels: labels1});
	var questions2 = [];
	questions2.push({ ID: 1, Text: "Describe course", type: "text", TextResults: "Answer1"});
	questions2.push({ ID: 2, Text: "How cool was teacher?", type: "single", TextResults: "", Data: data2, Labels: labels1});
	questions2.push({ ID: 3, Text: "How cool was course?", type: "multiple", TextResults: "", Data: data2, Labels: labels1});

	/* End of mock data  */ 

	EvaluationsResource.getEvaluation(userData.token, $stateParams.id).then(function(data){
		console.log(data);
		$scope.title = data.data.TemplateTitle;
		$scope.titleEN = data.data.TemplateTitleEN;
		$scope.courses.push({ CourseID: "T-427-WEPO", CourseName: "Vefforritun", Questions: questions1});
		$scope.courses.push({ CourseID: "T-501-FMAL", CourseName: "Forritunarmál", Questions: questions2});
		$scope.courses.push({ CourseID: "T-215-STY1", CourseName: "Stýrikerfi", Questions: questions1});
		$scope.selectedOption = $scope.courses[0];
	});
}]);
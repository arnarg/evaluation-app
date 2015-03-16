angular.module("evalApp").controller("TemplateController",
["$scope", "$rootScope", "$state", "userData", "TemplatesResource", "$modal",
function ($scope, $rootScope, $state, userData, TemplatesResource, $modal){
	$scope.errorMessage = "";
	$scope.template = {
		ID: 1,	// It don't matter
		Title: "",
		TitleEN: "",
		IntroText: "",
		IntroTextEN: "",
		CourseQuestions: [],
		TeacherQuestions: []
	};

	$scope.addQuestion = function(type) {
		var modal = $modal.open({
			templateUrl: "views/addtemplate.html",
			controller: "templateModalController"
		});

		modal.result.then(function(data) {
			if (type === "course") {
				$scope.template.CourseQuestions.push(data);
			}
			else if (type === "teacher") {
				$scope.template.TeacherQuestions.push(data);
			}
		}, function() {
			console.log("Dismissed");
		});
	};

	$scope.saveTemplate = function() {
		$scope.template.TitleEN = $scope.template.Title;
		$scope.template.IntroTextEN = $scope.template.IntroText;
		TemplatesResource.saveTemplate(userData.token, $scope.template)
			.then(function(data) {
				$state.go("evaluationsAdmin");
			});
	};
}]);

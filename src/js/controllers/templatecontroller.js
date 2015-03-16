angular.module("evalApp").controller("templateController",
["$scope", "$rootScope", "$state", "userData", "TemplatesResource", "$modal",
function ($scope, $rootScope, $state, userData, TemplatesResource, $modal){
	$scope.errorMessage = "";
	$scope.templateTitle = "";
	$scope.questions = [];

	$scope.addQuestion = function() {
		var modal = $modal.open({
			templateUrl: "views/addtemplate.html",
			controller: "templateModalController"
		});

		modal.result.then(function(data) {
			console.log(data);
		}, function() {
			console.log("Dismissed");
		});
	};
}]);

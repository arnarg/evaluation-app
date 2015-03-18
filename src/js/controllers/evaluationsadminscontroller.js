angular.module("evalApp").controller("evaluationsAdminController",
["$scope", "$rootScope", "$state", "TemplatesResource", "EvaluationsResource", "userData",
function ($scope, $rootScope, $state, TemplatesResource, EvaluationsResource, userData){
	$scope.errorMessage = "";
	$scope.evaluations = [];
	$scope.openEvaluations = [];
	$scope.closedEvaluations = [];
	$scope.pendingEvaluations = [];
	$scope.templates = [];
	TemplatesResource.getTemplates(userData.token).then(function(data){
		$scope.templates = data.data;
	});
	EvaluationsResource.getEvaluations(userData.token).then(function(data){
		$scope.evaluations = data.data;
		filterEvaluations();
	});

	function filterEvaluations(){
		for(var i = 0; i < $scope.evaluations.length; ++i){
			if($scope.evaluations[i].Status === "new"){
				$scope.pendingEvaluations.push($scope.evaluations[i]);
			}
			else if($scope.evaluations[i].Status === "open"){
				$scope.openEvaluations.push($scope.evaluations[i]);
			}
			else if($scope.evaluations[i].Status === "closed"){
				$scope.closedEvaluations.push($scope.evaluations[i]);
			}
		}
	}

	$scope.openEvaluationResult = function (id){
		$state.go("evaluationAdmin", { id: id });
	};

	$scope.openCreateEvaluation = function (){
		$state.go("evaluation");
	};

	$scope.openCreateTemplate = function (){
		$state.go("template");
	};
}]);

angular.module("evalApp").controller("EvaluationsAdminController",
["$scope", "$state", "EvaluationsResource", "userData",
function ($scope, $state, EvaluationsResource, userData){
	$scope.errorMessage = "";
	$scope.evaluations = [];
	$scope.openEvaluations = [];
	$scope.closedEvaluations = [];
	$scope.pendingEvaluations = [];

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

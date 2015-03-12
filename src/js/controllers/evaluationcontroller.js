angular.module("evalApp").controller("evaluationController",
["$scope", "$rootScope", "$state", "$stateParams",  
function ($scope, $rootScope, $state, $stateParams){
	console.log($stateParams.id);
}]);
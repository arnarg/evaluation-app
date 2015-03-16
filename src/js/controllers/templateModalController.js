angular.module("evalApp").controller("templateModalController", ["$scope", "$modalInstance",
function($scope, $modalInstance) {
    $scope.question = {
        ID: 1,  // Doesn't matter, API sets ID
        Text: undefined,
        TextEN: undefined,
        ImageURL: undefined,
        Type: "text",
        Answers: []
    };

    $scope.selectedType = {
        text: "Text",
        single: "Single choice",
        multiple: "Multiple choice"
    };

    $scope.setType = function(type) {
        $scope.question.Type = type;
    };

    $scope.ok = function() {
        $modalInstance.close($scope.question);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
    };
}]);

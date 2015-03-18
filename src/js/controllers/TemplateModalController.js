angular.module("evalApp").controller("TemplateModalController", ["$scope", "$modalInstance",
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

    $scope.newAnswer = "";

    var weightCounter = 1;

    $scope.setType = function(type) {
        $scope.question.Type = type;
    };

    $scope.addAnswer = function() {
        if ($scope.newAnswer !== "") {
            $scope.question.Answers.push({
                ID: 1,  // Again doesn't matter
                Text: $scope.newAnswer,
                TextEN: undefined,
                ImageURL: undefined,
                Weight: weightCounter
            });
            $scope.newAnswer = "";
            ++weightCounter;
        }
    };

    $scope.ok = function() {
        $modalInstance.close($scope.question);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
    };
}]);

angular.module("evalApp")
    .directive("evaluationQuestion", function() {
        return {
            restrict: 'E',
            scope: {
                question: '=ngModel'
            },
            template: '<ng-include src="getTemplateUrl()"/>',
            controller: ["$scope", function($scope) {
                $scope.getTemplateUrl = function() {
                    return "templates/question." + $scope.question.Type + ".html";
                };
            }]
        };
    }
);

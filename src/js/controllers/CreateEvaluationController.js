angular.module("evalApp").controller("CreateEvaluationController", ["$scope", "$state", "userData", "TemplatesResource", "EvaluationsResource", "toastr",
function($scope, $state, userData, TemplatesResource, EvaluationsResource, toastr) {

    $scope.getTemplates = function() {
        TemplatesResource.getTemplates(userData.token).then(function(data) {
            $scope.templates = data.data;
        });
    };

    $scope.getTemplates();

    $scope.getTemplate = function(id) {
        TemplatesResource.getTemplateByID(userData.token, id).then(function(data) {
            $scope.template = data.data;
        });
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.saveEvaluation = function() {
        if ($scope.template === undefined) {
            toastr.error("Please select a template");
        }
        else if ($scope.StartDate === undefined) {
            toastr.error("Please select a start date");
        }
        else if ($scope.EndDate === undefined) {
            toastr.error("Please select an end date");
        }
        else {
            EvaluationsResource.saveEvaluation(userData.token, {
                TemplateID: $scope.template.ID,
                StartDate: $scope.StartDate.toISOString(),
                EndDate: $scope.EndDate.toISOString()
            }).then(function(data) {
                if (data.status === 204) {
                    toastr.success("Evaluation was successfully saved", "Success!");
                    $state.go("evaluationsAdmin");
                }
            });
        }
    };
}]);

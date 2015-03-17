angular.module("evalApp").controller("NavbarController", ["$scope", "$state", "userData",
function($scope, $state, userData) {
    $scope.loggedin = false;

    $scope.$on("login", function(e) {
        if (userData.role === "admin") {
            $scope.navigation = [
                {
                    Title: "Home",
                    State: "evaluationsAdmin",
                    Active: true
                },
                {
                    Title: "Create template",
                    State: "template",
                    Active: false
                },
                {
                    Title: "Create evaluation",
                    State: "evaluation",
                    Active: false
                }
            ];
        }
        else if (userData.role === "student") {
            $scope.navigation = undefined;
        }

        $scope.username = userData.username;
        $scope.loggedin = true;
    });

    $scope.logout = function() {
        userData = {};
        $scope.loggedin = false;
        $scope.navigation = undefined;
        $state.go("login");
    };
}]);

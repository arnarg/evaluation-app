angular.module("evalApp", ['ui.router']);
angular.module("evalApp").value("userData", { token: undefined, username: undefined, role: undefined});
angular.module("evalApp")
    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "views/login.html",
                    controller: "loginController"
                })
                .state("evaluationsStudent", {
                    url: "/evaluations",
                    templateUrl: "views/evaluations.student.html",
                    controller: "evaluationsController"
                });
        }
    ]);

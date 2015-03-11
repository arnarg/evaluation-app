angular.module("evalApp", ['ui.router']);

angular.module("evalApp")
    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "views/login.html",
                    controller: "loginController"
                }),
                .state("evaluations", {
                    url: "/evaluations",
                    templateUrl: "views/evluations.html",
                    controller: "evaluationController"
                });
        }
    ]);

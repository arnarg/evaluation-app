angular.module("evalApp", [
    'ui.router',
    'ui.bootstrap'
]);

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
                    controller: "evaluationsStudentController"
                })
                .state("evaluationsAdmin", {
                    url: "/evaluations",
                    templateUrl: "views/evaluations.admin.html",
                    controller: "evaluationsAdminController"
                })
                .state("template", {
                    url: "/template",
                    templateUrl: "views/template.html",
                    controller: "templateController"
                })
                .state("evaluationStudent", {
                    url: "/evaluation/:course/:semester/:id",
                    templateUrl: "views/evaluation.student.html",
                    controller: "evaluationController"
                });
        }
    ]);

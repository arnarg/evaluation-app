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
                    controller: "evaluationsStudentController"
                })
                .state("evaluationsAdmin", {
                    url: "/evaluationsAdmin",
                    templateUrl: "views/evaluations.admin.html",
                    controller: "evaluationsAdminController"
                })
                .state("template", {
                    url: "/template/:id",
                    templateUrl: "views/template.html",
                    controller: "TemplateController"
                })
                .state("evaluationStudent", {
                    url: "/evaluation/:course/:semester/:id",
                    templateUrl: "views/evaluation.student.html",
                    controller: "evaluationStudentController"
                })
                .state("evaluationAdmin", {
                    url: "/evaluation/:id",
                    templateUrl: "views/evaluation.admin.html",
                    controller: "evaluationAdminController"
                });
        }
    ]);

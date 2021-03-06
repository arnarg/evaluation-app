angular.module("evalApp", [
	'ui.router',
	'ui.bootstrap',
	'chart.js',
	'toastr'
]);

angular.module("evalApp").value("userData", {
	token: undefined,
	username: undefined,
	role: undefined
});

angular.module("evalApp")
	.config(["$stateProvider", "$urlRouterProvider",
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/login");

			$stateProvider
				.state("login", {
					url: "/login",
					templateUrl: "views/login.html",
					controller: "LoginController"
				})
				.state("evaluationsStudent", {
					url: "/evaluations",
					templateUrl: "views/evaluations.student.html",
					controller: "EvaluationsStudentController"
				})
				.state("evaluationsAdmin", {
					url: "/evaluationsAdmin",
					templateUrl: "views/evaluations.admin.html",
					controller: "EvaluationsAdminController"
				})
				.state("template", {
					url: "/template",
					templateUrl: "views/template.html",
					controller: "TemplateController"
				})
				.state("evaluation", {
					url: "/evaluation",
					templateUrl: "views/createEvaluation.html",
					controller: "CreateEvaluationController"
				})
				.state("evaluationStudent", {
					url: "/evaluation/:course/:semester/:id",
					templateUrl: "views/evaluation.student.html",
					controller: "EvaluationStudentController"
				})
				.state("evaluationAdmin", {
					url: "/evaluation/:id",
					templateUrl: "views/evaluation.admin.html",
					controller: "EvaluationAdminController"
				});
		}
	]);

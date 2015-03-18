angular.module("evalApp").constant("SERVER_URL", "http://dispatch.ru.is/h24/api/v1/");

angular.module("evalApp").factory("LoginResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		login: function(data){
			return $http.post(SERVER_URL + "login", data);
		}
	};
}]);

angular.module("evalApp").factory("EvaluationsResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		getEvaluations: function(tok){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "evaluations");
		},
		getEvaluation: function(tok, id){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "evaluations/" + id);
		},
		saveEvaluation: function(tok, data){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.post(SERVER_URL + "evaluations", data);
		}
	};
}]);

angular.module("evalApp").factory("CoursesResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		getEvaluation: function(tok, course, semester, id){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "courses/" + course + "/" + semester + "/evaluations/" + id);
		},
		getTeachers: function(tok, course, semester){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "courses/" + course + "/" + semester + "/teachers/");
		},
		saveEvaluation: function(tok, course, semester, id, data){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.post(SERVER_URL + "courses/" + course + "/" + semester + "/evaluations/" + id, data);
		}
	};
}]);

angular.module("evalApp").factory("MyResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		getCourses: function(tok){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "my/courses");
		},
		getEvaluations: function(tok){
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "my/evaluations");
		}
	};
}]);

angular.module("evalApp").factory("TemplatesResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		saveTemplate: function(tok, template) {
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.post(SERVER_URL + "evaluationtemplates/", template);
		},
		getTemplates: function(tok) {
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "evaluationtemplates");
		},
		getTemplateByID: function(tok, ID) {
			$http.defaults.headers.common.Authorization = "Basic " + tok;
			return $http.get(SERVER_URL + "evaluationtemplates/" + ID);
		}
	};
}]);

angular.module("evalApp").constant("SERVER_URL", "http://dispatch.ru.is/h24/api/v1/");


angular.module("evalApp").factory("LoginResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		login: function(data){
			console.log(data);
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
		getEvaluation: function(id){
			return $http.get(SERVER_URL + "evaluations/:" + id);
		},
		postEvaluation: function(data){
			console.log(data);
			return $http.post(SERVER_URL + "evaluations", data);
		},
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
		login: function(data){
			console.log(data);
			return $http.post(SERVER_URL + "login", data);
		}
	};
}]);
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
		
		}
	};
}]);

angular.module("evalApp").factory("TemplatesResource",
["$http", "SERVER_URL", function($http, SERVER_URL){
	return {
		
		}
	};
}]);
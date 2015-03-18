describe("EvaluationsStudentController tests", function() {
	var controller, deferred;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $q, $state, $rootScope, _MyResource_) {
		scope = $rootScope.$new();
		rootScope = $rootScope;

		spyOn(_MyResource_, "getCourses").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn(_MyResource_, "getEvaluations").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn($state, "go");

		controller = $controller("EvaluationsStudentController", {
			$scope: scope
		});
	}));

	it("should initialize value right", function() {
		expect(scope.courses.length).toBe(0);
		expect(scope.evaluations.length).toBe(0);
	});

	it("should get right course", inject(function(userData, $httpBackend) {
		$httpBackend.expect("GET", "views/login.html").respond(200);
		userData.token = "0123456789";
		var mockData = {
			data: { mock: "data" }
		};
		scope.getCourses();

		deferred.resolve(mockData);

		rootScope.$apply();

		expect(scope.courses).toEqual({mock: "data"});

		$httpBackend.flush();
	}));
	it("should get right evaluation", inject(function(userData, $httpBackend) {
		$httpBackend.expect("GET", "views/login.html").respond(200);
		userData.token = "0123456789";
		var mockData = {
			data: { mock: "data" }
		};
		scope.getEvaluations();

		deferred.resolve(mockData);

		rootScope.$apply();

		expect(scope.evaluations).toEqual({mock: "data"});
		
		$httpBackend.flush();
	}));
	it("should go to right state when opening evaluation", inject(function($state) {
		scope.openEvaluation(1, 2, 3);
		expect($state.go).toHaveBeenCalledWith("evaluationStudent", { course: 1, semester: 2, id: 3 });
	}));
});
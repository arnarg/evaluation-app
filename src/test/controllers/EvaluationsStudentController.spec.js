describe("EvaluationsStudentController tests", function() {
	var controller, deferred;

	beforeEach("evalApp");
	beforeEach(inject(function($controller, $q, $rootScope, _MyResource_) {
		scope = $rootScope.$new();

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
	/*it("should get right course", inject(function(userData) {
		scope.getCourses();

		deferred.resolve({
			data: {
				Token: "0123456789"
			}
		});
	}));
	it("should direct to the right state when opening evaluations", inject(function($state) {
		scope.openEvaluation("T-427-WEPO", "20151", "1");
		expect($state.go).toHaveBeenCalledWith("evaluationStudent", "T-427-WEPO", "20151", "1");
	});*/
});
describe("EvaluationAdminController tests", function(){
	var controller, scope, rootScope, deferred;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $q, toastr, _EvaluationsResource_) {
		scope = $rootScope.$new();
		rootScope = $rootScope;

		spyOn(_EvaluationsResource_, "getEvaluation").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn(toastr, "error");

		//spyOn(fillScopeData);

		controller = $controller("EvaluationAdminController", {
			$scope: scope,
			$stateParams: { id: 1 }
		});
	}));

	it("should be rightly initialized", function() {
		expect(scope.title).toEqual("");
		expect(scope.titleEN).toEqual("");
		expect(scope.courses.length).toBe(0);
		expect(scope.titleEN.length).toBe(0);
	});
	describe("when getting evaluations", function() {
		it("should get right evaluation", inject(function(userData) {
			userData.token = "0123456789";
			var mockData = {
				data: {
					TemplateTitle: "Template",
					TemplateTitleEN: "TemplateEN",
					Courses: []
				}
			};
			scope.getEvaluation();
			deferred.resolve(mockData);
			rootScope.$apply();

			expect(scope.title).toEqual(mockData.data.TemplateTitle);
			expect(scope.titleEN).toEqual(mockData.data.TemplateTitleEN);
			expect(scope.courses).toEqual(mockData.data.Courses);
		}));
		it("should display toastr error if no student answered", inject(function(toastr, userData){
			userData.token = "0123456789";
			var mockData = {
				data: {
					TemplateTitle: "Template",
					TemplateTitleEN: "TemplateEN",
					Courses: []
				}
			};
			scope.getEvaluation();
			deferred.resolve(mockData);
			rootScope.$apply();

			expect(toastr.error).toHaveBeenCalledWith("No students answered this evaluation");
		}));
		/*it("should change selectedOption if any student answered", inject(function(toastr, userData){
			userData.token = "0123456789";
			var mockData = {
				data: {
					TemplateTitle: "Template",
					TemplateTitleEN: "TemplateEN",
					Courses: ["VEFF"]
				}
			};
			scope.getEvaluation();
			deferred.resolve(mockData);
			rootScope.$apply();

			expect(scope.selectedOption).toEqual(scope.courses[0]);
		}));*/
	});
});
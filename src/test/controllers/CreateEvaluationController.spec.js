describe("CreateEvaluationController", function() {
	var controller, rootScope, scope, deferred;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, toastr, $q, $state, _TemplatesResource_, _EvaluationsResource_) {
		scope = $rootScope.$new();
		rootScope = $rootScope;

		spyOn(_TemplatesResource_, "getTemplates").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn(_TemplatesResource_, "getTemplateByID").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn(_EvaluationsResource_, "saveEvaluation").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn(toastr, "error");
		spyOn(toastr, "success");
		spyOn($state, "go");

		controller = $controller("CreateEvaluationController", {
			$scope: scope
		});
	}));

	it("should get template", inject(function(userData, $httpBackend) {
		$httpBackend.expect("GET", "views/login.html").respond(200);
		var mockTemplate = {
			ID: 1,	// It don't matter
			Title: "Title",
			TitleEN: "TitleEN",
			IntroText: "IntroText",
			IntroTextEN: "IntroTextEN",
			CourseQuestions: [],
			TeacherQuestions: []
		}
		userData.token = "0123456789";
		scope.getTemplates();
		deferred.resolve({
			data: mockTemplate
		});

		rootScope.$apply();

		expect(scope.templates).toEqual(mockTemplate);
	}));

	it("should get template by id", inject(function(userData, $httpBackend) {
		$httpBackend.expect("GET", "views/login.html").respond(200);
		var mockTemplate = {
			ID: 1,
			Title: "Title",
			TitleEN: "TitleEN",
			IntroText: "IntroText",
			IntroTextEN: "IntroTextEN",
			CourseQuestions: [],
			TeacherQuestions: []
		}
		userData.token = "0123456789";
		scope.getTemplate(1);

		deferred.resolve({
			data: mockTemplate
		});

		rootScope.$apply();

		expect(scope.template).toEqual(mockTemplate);

		$httpBackend.flush();
	}));

	describe("when saving evaluation", function(){
		it("should throw toastr error if it is empty", inject(function(toastr) {
			scope.template = undefined;
			scope.saveEvaluation();
			expect(toastr.error).toHaveBeenCalledWith("Please select a template");
		}));
		it("should throw toastr error if start date is not defined", inject(function(toastr) {
			scope.template = {};
			scope.StartDate = undefined;
			scope.saveEvaluation();
			expect(toastr.error).toHaveBeenCalledWith("Please select a start date");
		}));
		it("should throw toastr error if end date is not defined", inject(function(toastr) {
			scope.template = {};
			scope.EndDate = undefined;
			scope.StartDate = "not undefined";
			scope.saveEvaluation();
			expect(toastr.error).toHaveBeenCalledWith("Please select an end date");
		}));
		it("should throw toastr error if end date is not defined", inject(function(toastr) {
			scope.template = {};
			scope.EndDate = undefined;
			scope.StartDate = "not undefined";
			scope.saveEvaluation();
			expect(toastr.error).toHaveBeenCalledWith("Please select an end date");
		}));
		it("should throw toastr success if savyng evaluation was successful", inject(function(toastr, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.template = {
				id: 1
			};
			scope.StartDate = new Date();
			scope.EndDate = new Date();
			scope.saveEvaluation();
			deferred.resolve({
				status: 204
			});
			rootScope.$apply();

			expect(toastr.success).toHaveBeenCalledWith("Evaluation was successfully saved", "Success!");

			$httpBackend.flush();
		}));
	});
});
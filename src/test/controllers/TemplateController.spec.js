describe("TemplateController tests", function() {
	var controller, scope;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $q, $state, $modal, _TemplatesResource_) {
		rootScope = $rootScope;
		scope = $rootScope.$new();

		spyOn(_TemplatesResource_, "saveTemplate").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn($state, "go");

		spyOn($modal, "open").and.returnValue(mockModal);

		var mockModal = {
			result: {
				then: function(confirmCallback, cancelCallback) {
					this.confirmCallback = confirmCallback;
					this.cancelCallback = cancelCallback;
				}
			}
		};

		controller = $controller("TemplateController", {
			$scope: scope,
			$rootScope: rootScope,
			TemplatesResource: _TemplatesResource_
		});
	}));

	it("should have first template question with ID 1", function() {
		expect(scope.template.ID).toEqual(1);
	});

	describe("add questions", function() {
		it("should open modal window and redirect to right view", function() {
			//
		});
	});

	/*it("should save template and redirect to right state", inject(function($state, userData) {
		userData.token = "0123456789";
		scope.template = {
			ID: "1",
			Title: "Template",
			TitleEn: "Template",
			IntroText: "IntroText",
			IntroTextEN: "IntroTextEN",
			CourseQuestions: [],
			TeacherQuestions: []
		};
		scope.saveTemplate();
		expect($state.go).toHaveBeenCalledWith("evaluationsAdmin");
	}));*/
});
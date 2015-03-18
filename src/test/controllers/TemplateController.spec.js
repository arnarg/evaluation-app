describe("TemplateController tests", function() {
	var controller, scope;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $state, _TemplatesResource_) {
		rootScope = $rootScope;
		scope = $rootScope.$new();

		spyOn(_TemplatesResource_, "saveTemplate").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn($state, "go");

		controller = $controller("TemplateController", {
			$scope: scope,
			$rootScope: rootScope,
			TemplatesResource: _TemplatesResource_
		});
	}));

	describe("template questions", function() {
		it("should have first question with ID 1", function() {
			expect(scope.template.ID).toEqual(1);
		});
	});
});
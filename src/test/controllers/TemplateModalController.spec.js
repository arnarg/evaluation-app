describe("TemplateModalController tests", function() {
	var controller, scope;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $modal) {
		scope = $rootScope.$new();

		var modalInstance = {
			close: function( item ) {
				this.result.confirmCallBack( item );
			},
			dismiss: function( type ) {
				this.result.cancelCallback( type );
			}
		}

		controller = $controller("TemplateModalController", {
			$scope: scope,
			$modalInstance: modalInstance
		});
	}));

	describe("template questions", function() {
		it("should have first question with ID 1", function() {
			expect(scope.question.ID).toEqual(1);
		});
		it("should set right type", function() {
			scope.setType("text");
			expect(scope.question.Type).toEqual("text");
		});
		it("should add answer to array if it is not empty", function() {
			scope.newAnswer = "Teacher is cool";
			scope.addAnswer();

			expect(scope.question.Answers.length).not.toBeLessThan(1);
		});
	});
	describe("modalInstance behaviour", function() {
		//
	});
});
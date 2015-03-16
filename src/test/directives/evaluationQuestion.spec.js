describe("testing evaluation-question directive", function() {
	var element, scope;

	beforeEach(module("evalApp"));

	var makeDirective = function(_question_) {
		inject(function($compile, $rootScope) {
			scope = $rootScope.$new();
			scope.question = _question_;
			element = "<evaluation-question ng-model='question'></evaluation-question>"
			element = $compile(element)(scope);
			scope.$digest();
		});
	};

	describe("test if all types GET correct templates", function() {
		it("should GET correct template when type is text", inject(function($httpBackend) {
			$httpBackend.expectGET("templates/question.text.html").respond(200, "OK");
			makeDirective({
				ID: 1,
				Text: "spurning?",
				TextEN: "question?",
				ImageURL: undefined,
				Type: "text"
			});
			$httpBackend.flush();
		}));

		it("should GET correct template when type is single", inject(function($httpBackend) {
			$httpBackend.expectGET("templates/question.single.html").respond(200, "OK");
			makeDirective({
				ID: 1,
				Text: "spurning?",
				TextEN: "question?",
				ImageURL: undefined,
				Type: "single"
			});
			$httpBackend.flush();
		}));

		it("should GET correct template when type is multiple", inject(function($httpBackend) {
			$httpBackend.expectGET("templates/question.multiple.html").respond(200, "OK");
			makeDirective({
				ID: 1,
				Text: "spurning?",
				TextEN: "question?",
				ImageURL: undefined,
				Type: "multiple"
			});
			$httpBackend.flush();
		}));
	});
});

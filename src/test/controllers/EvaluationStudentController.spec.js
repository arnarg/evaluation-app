describe("EvaluationStudentController tests", function() {
	var controller, scope, URL;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $state, $q, _CoursesResource_, SERVER_URL) {
		scope = $rootScope.$new();
		URL = SERVER_URL;

		spyOn(_CoursesResource_, "getEvaluation").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});
		spyOn(_CoursesResource_, "saveEvaluation").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});
		spyOn($state, "go");

		controller = $controller("EvaluationStudentController", {
			$scope: scope,
			CourseResources: _CoursesResource_
		});
	}));

	describe("getting template", function() {
		// Þarf að laga
		it("should get right template", inject(function(_CoursesResource_, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			//$httpBackend.expect("GET", URL + "courses/T-427-WEPO/20151/evaluations/1")
			//.respond(200, "[{ success: 'true', id: 123 }]");
			_CoursesResource_.getEvaluation("0123456789", "T-427-WEPO", "20151", "1")
			.then(function(data) {
				expect(data.success).toBeTruthy();
			});
			$httpBackend.flush();
		}));
	});

	describe("submitting evaluation template", function() {
		/*

		it("should push right value to courseQuestions array", function() {
			var mockQuestionID = "1";
			var mockTeacherSSN = "0123456789";
			var mockValue = "Is course cool?";
			var mockQuestionAnswers = [];

			scope.courseQuestions({
				mockQuestionAnswers.push({
					QuestionID: mockQuestionID,
					TeacherSSN: mockTeacherSSN,
					Value: mockValue
				});
			});

			expect(scope.courseQuestions.QuestionAnswers.QuestionID).toBe(mockQuestionID);
			expect(scope.courseQuestions.QuestionAnswers.TeacherSSN).toBe(mockTeacherSSN);
			expect(scope.courseQuestions.QuestionAnswers.Value).toBe(mockQuestionAnswer);
		});*/
		it("should contain at least one course question", function() {
			scope.submitEvaluation();
			scope.courseQuestions.push({
				QuestionID: "1",
				TeacherSSN: "0123456789",
				Value: "Is course cool?"
			});
			expect(scope.courseQuestions).not.toBe(undefined);
		});
		it("should contain at least one teacher question", function() {
			scope.submitEvaluation();
			scope.teacherQuestions.push({
				QuestionID: "1",
				TeacherSSN: "0123456789",
				Value: "Is teacher cool?"
			});
			expect(scope.teacherQuestions).not.toBe(undefined);
		});
		// error message
	});
});
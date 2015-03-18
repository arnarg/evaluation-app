describe("testing functions that talk to backend", function() {
	var URL;
	beforeEach(module("evalApp"));
	beforeEach(inject(function(SERVER_URL) {
		URL = SERVER_URL;
	}));

	describe("testing LoginResource", function() {
		var LoginRes;
		beforeEach(inject(function(LoginResource, SERVER_URL) {
			LoginRes = LoginResource;
		}));

		it("should POST correct data when trying to log in", inject(function($httpBackend) {
			$httpBackend.expect("POST", URL + "login", {user: "dabs", pass: "123456"})
				.respond(200, "mock data");
			LoginRes.login({user: "dabs", pass: "123456"});
			$httpBackend.flush();
		}));
	});

	describe("testing EvaluationsResource", function() {
		var EvalRes;
		beforeEach(inject(function(EvaluationsResource, SERVER_URL) {
			EvalRes = EvaluationsResource;
		}));

		it("should put token in header and GET correct url when getting evaluations", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "evaluations", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			EvalRes.getEvaluations("0123456789");
			$httpBackend.flush();
		}));

		it("should put token in header and GET correct url and ID when getting specific evaluations", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "evaluations/" + 1, null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			EvalRes.getEvaluation("0123456789", "1");
			$httpBackend.flush();
		}));

		it("should put token in header and POST correct data when saving evaluation", inject(function($httpBackend) {
			$httpBackend.expect("POST", URL + "evaluations", {mock: "object"}, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			EvalRes.saveEvaluation("0123456789", {mock: "object"});
			$httpBackend.flush();
		}));
	});

	describe("testing CoursesResource", function() {
		var CourseRes;
		beforeEach(inject(function(CoursesResource, SERVER_URL) {
			CourseRes = CoursesResource;
		}));

		it("should put token in header and GET correct url when getting courses", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "courses/60/20151/evaluations/28", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			CourseRes.getEvaluation("0123456789", 60, 20151, 28);
			$httpBackend.flush();
		}));
		it("should put token in header and POST at correct url when saving evaluation", inject(function($httpBackend) {
			$httpBackend.expect("POST", URL + "courses/60/20151/evaluations/28", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			CourseRes.saveEvaluation("0123456789", 60, 20151, 28);
			$httpBackend.flush();
		}));
	});
	
	describe("testing MyResource", function() {
		var MyRes;
		beforeEach(inject(function(MyResource, SERVER_URL) {
			MyRes = MyResource;
		}));

		it("should put token in header and GET correct url when getting courses", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "my/courses", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			MyRes.getCourses("0123456789");
			$httpBackend.flush();
		}));

		it("should put token in heade and GET correct url when getting evaluations", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "my/evaluations", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			MyRes.getEvaluations("0123456789");
			$httpBackend.flush();
		}));
	});
	
	describe("testing TemplatesResource", function() {
		var TemplateRes;
		beforeEach(inject(function(TemplatesResource, SERVER_URL) {
			TemplateRes = TemplatesResource;
		}));

		it("should put token in header and POST correct url when saving template", inject(function($httpBackend) {
			$httpBackend.expect("POST", URL + "evaluationtemplates/", 1, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			TemplateRes.saveTemplate("0123456789", 1);
			$httpBackend.flush();
		}));
		it("should put token in header and GET correct url when getting templates", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "evaluationtemplates", null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			TemplateRes.getTemplates("0123456789");
			$httpBackend.flush();
		}));
		it("should put token in header and GET correct url and ID when getting template by ID", inject(function($httpBackend) {
			$httpBackend.expect("GET", URL + "evaluationtemplates/" + 1, null, function(headers) {
				expect(headers.Authorization).toBe("Basic 0123456789");
				return headers.Authorization === "Basic 0123456789";
			}).respond(200, "mock data");
			TemplateRes.getTemplateByID("0123456789", 1);
			$httpBackend.flush();
		}));
	});
});

describe("loginController tests", function() {
	var controller, scope, rootScope, deferred;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $q, $state, _LoginResource_) {
		rootScope = $rootScope;
		scope = $rootScope.$new();

		spyOn(_LoginResource_, "login").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn($state, "go");

		controller = $controller("loginController", {
			$scope: scope,
			$rootScope: rootScope,
			LoginResource: _LoginResource_
		});
	}));

	describe("login function", function() {
		it("should log errorMessage if there is no nickname or password", function() {
			scope.login();
			expect(scope.errorMessage).toEqual("Please input nickname and password");
		});
		it("should log errorMessage if there is no password", function() {
			scope.nickname = "dabs";
			scope.login();
			expect(scope.errorMessage).toEqual("Please input nickname and password");
		});
		it("should log errorMessage if there is no username", function() {
			scope.password = "123456";
			scope.login();
			expect(scope.errorMessage).toEqual("Please input nickname and password");
		});
		it("should log errorMessage if we get 401 error from server (username or password not found)", inject(function($httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "admin";
			scope.password = "123456";

			scope.login();

			deferred.reject({
				status: 401,
				statusText: "Unauthorized"
			});

			rootScope.$apply();

			expect(scope.errorMessage).toEqual("Username or password not found");
			$httpBackend.flush();
		}));
		it("should log errorMessage if we get any other error from server", inject(function($httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "admin";
			scope.password = "123456";

			scope.login();

			deferred.reject({
				status: 400,
			});

			rootScope.$apply();

			expect(scope.errorMessage).toEqual("An error has occured, please try again");
			$httpBackend.flush();
		}));
		it("should save right userdata when logging in as a student", inject(function(userData, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "dabs";
			scope.password = "123456";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: "dabs",
						Role: "student"
					}
				}
			});

			rootScope.$apply();

			expect(userData.username).toEqual("dabs");
			expect(userData.token).toEqual("0123456789");
			expect(userData.role).toEqual("student");

			$httpBackend.flush();
		}));
		it("should save right userdata when logging in as an admin", inject(function(userData, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "admin";
			scope.password = "123456";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: "admin",
						Role: "admin"
					}
				}
			});

			rootScope.$apply();

			expect(userData.username).toEqual("admin");
			expect(userData.token).toEqual("0123456789");
			expect(userData.role).toEqual("admin");

			$httpBackend.flush();
		}));
	});

	describe("state go", function() {
		it("should go to correct state when logged in as student", inject(function($state, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "dabs";
			scope.password = "12345";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: "dabs",
						Role: "student"
					}
				}
			});

			rootScope.$apply();

			expect($state.go).toHaveBeenCalledWith("evaluationsStudent");

			$httpBackend.flush();
		}));
		it("should go to correct state when logged in as admin", inject(function($state, $httpBackend) {
			$httpBackend.expect("GET", "views/login.html").respond(200);
			scope.nickname = "admin";
			scope.password = "12345";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: "admin",
						Role: "admin"
					}
				}
			});

			rootScope.$apply();

			expect($state.go).toHaveBeenCalledWith("evaluationsAdmin");

			$httpBackend.flush();
		}));
	});
});

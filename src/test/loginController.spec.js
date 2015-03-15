describe("loginController tests", function(){
	var controller, scope, rootScope, deferred;

	beforeEach(module("evalApp"));

	beforeEach(inject(function($controller, $rootScope, $q, $state, _LoginResource_) {
		rootScope = $rootScope;
		scope = $rootScope.$new();

		spyOn(_LoginResource_, 'login').and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});

		spyOn($state, 'go');

		controller = $controller("loginController", {
			$scope: scope,
			$rootScope: rootScope,
			LoginResource: _LoginResource_
		});
	}));

	describe("login function", function(){

		it("should log errorMessage if there is no nickname or password", function(){
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
		it("should save right userdata when logging in as student", inject(function(userData, $httpBackend){
			$httpBackend.expectGET('views/login.html').respond(200);

			var nickname = "dabs";
			scope.nickname = nickname;
			scope.password = "123456";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: nickname,
						Role: "student"
					}
				}
			});

			rootScope.$apply();

			expect(userData.username).toEqual(nickname);
			expect(userData.token).toEqual("0123456789");
			expect(userData.role).toEqual("student")

			$httpBackend.flush();
		}));
		it("should save right userdata when logging in as admin", inject(function(userData, $httpBackend){
			$httpBackend.expectGET('views/login.html').respond(200);

			var nickname = "admin";
			scope.nickname = nickname;
			scope.password = "123456";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: nickname,
						Role: "admin"
					}
				}
			});

			rootScope.$apply();

			expect(userData.username).toEqual(nickname);
			expect(userData.token).toEqual("0123456789");
			expect(userData.role).toEqual("admin")

			$httpBackend.flush();
		}));
	});

	describe("state go", function(){
		it("should go to correct state when logged in as student",
		inject(function($state, $httpBackend){
			$httpBackend.expectGET('views/login.html').respond(200);

			var nickname = "dabs";
			scope.nickname = nickname;
			scope.password = "12345";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: nickname,
						Role: "student"
					}
				}
			});

			rootScope.$apply();

			expect($state.go).toHaveBeenCalledWith("evaluationsStudent");

			$httpBackend.flush();
		}));
		it("should go to correct state when logged in as admin",
		inject(function($state, $httpBackend){
			$httpBackend.expectGET('views/login.html').respond(200);

			var nickname = "admin";
			scope.nickname = nickname;
			scope.password = "12345";

			scope.login();

			deferred.resolve({
				data: {
					Token: "0123456789",
					User: {
						FullName: nickname,
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

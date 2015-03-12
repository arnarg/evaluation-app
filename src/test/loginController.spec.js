describe("loginController tests", function(){
	var controller, scope, rootScope, deferred;
	var mockLogin = {
		mockLoginResource: {
			login: function(data){
				deferred = q.defer();
				return deferred.promise;
			}
		},
		mockUserData: {
			token: undefined,
			username: undefined,
			role: undefined
		},
		login: function(){
			return mockLogin.nickname === "DABS";
		},
		mockLoginResourceResponse: {
			data: {
				Token: "ZGFiczoxMjM0NQ",
				User: {
					FullName: "dabs",
					Role: "student"
				}
			}
		}
	};

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $rootScope, $q){
		scope = $rootScope.$new();
		q = $q;
		controller = $controller("loginController", {
			$scope: scope,
			$rootScope: $rootScope,
			LoginResource: mockLogin.mockLoginResource,
			userData: mockLogin.mockUserData
		});
	}));

	describe("login function", function(){
		it("should log errorMessage if there is no nickname or password", function(){
			scope.login();
			expect(scope.errorMessage).toEqual("Please input nickname and password");
		});
		it("should save right userdata when logging in", function(){
			var nickname = "dabs";
			scope.nickname = nickname;
			scope.login();
			deferred.resolve(mockLogin.mockLoginResourceResponse);
			expect(nickname).toEqual(mockLogin.mockLoginResourceResponse.User.FullName);
		});
	});

	describe("state go", function(){
		beforeEach(inject(function($state){
			spyOn($state, "go");
		}));

		it("should be called when log in is successfull", inject(function($state){
			scope.nickname = "dabs";
			scope.password = "12345";
			scope.login();
			expect($state.go).toHaveBeenCalled();
		}));
	});
});
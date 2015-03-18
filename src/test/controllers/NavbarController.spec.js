describe("NavbarController tests", function() {
	var controller, scope;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $state, $rootScope, $q) {
		scope = $rootScope.$new();

		spyOn($state, "go");

		controller = $controller("NavbarController", {
			$scope: scope
		});
	}));

	describe("NavbarController function", function() {
		it("should have loggedin as false before login", function() {
			expect(scope.loggedin).toEqual(false);
		});
		it("should have right userData after logging in as student", inject(function($rootScope, userData) {
			userData.token = "0123456789";
			userData.username = "dabs";
			userData.role = "student";
			$rootScope.$broadcast("login");

			expect(scope.username).toEqual("dabs");
			expect(scope.loggedin).toEqual(true);
		}));
		it("should have right userData after login as admin", inject(function($rootScope, userData) {
			userData.token = "0123456789";
			userData.username = "admin";
			userData.role = "admin";
			$rootScope.$broadcast("login");

			expect(scope.username).toEqual("admin");
			expect(scope.loggedin).toEqual(true);
		}));
		it("should have right userData after logout", inject(function(userData) {
			scope.logout();
			expect(userData.token).toEqual(undefined);
			expect(userData.username).toEqual(undefined);
			expect(scope.role).toEqual(undefined);
		}));
		it("should have right other data after logout", function() {
			scope.logout();
			expect(scope.loggedin).toEqual(false);
			expect(scope.navigation).toEqual(undefined);
		});
		it("should go to right state after logout", inject(function($state) {
			scope.logout();
			expect($state.go).toHaveBeenCalledWith("login");
		}));
	});
});
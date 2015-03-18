describe("NavbarController tests", function() {
	var controller, scope, deferred, login;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $state, $rootScope, $q) {
		scope = $rootScope.$new();

		spyOn($state, "go");

		login = scope.$broadcast("login");

		controller = $controller("NavbarController", {
			$scope: scope
		});
	}));

	describe("NavbarController function", function() {
		it("should have loggedin as false before login", function() {
			expect(scope.loggedin).toEqual(false);
		});
		it("should call login successfully", function() {
			//
		});
		it("should have right userData after login", function() {
			//expect(scope.username).toEqual("dabs");
			//expect(scope.loggedin).toEqual(true);
		});
		it("should have right userData after logout", function() {
			scope.logout();
			
		});
		it("should go to right state after logout", inject(function($state) {
			scope.logout();
			expect($state.go).toHaveBeenCalledWith("login");
		}));
	});
});
describe("NavbarController tests", function() {
	var controller, scope, deferred;

	beforeEach(module("evalApp"));
	beforeEach(inject(function($controller, $state, $rootScope, $q) {
		scope = $rootScope.$new();

		spyOn($state, "go");

		/*spyOn($scope.$on, "login").and.callFake(function() {
			deferred = $q.defer();
			return deferred.promise;
		});*/

		controller = $controller("NavbarController", {
			$scope: scope
		});
	}));

	describe("NavbarController function", function() {
		it("should have loggedin as false before login", function() {
			expect(scope.loggedin).toEqual(false);
		});
		it("should have right userData after login", function() {
			//
		});
		it("should have right userData after logout", function() {
			//expect(scope.username).toEqual("dabs");
			//expect(scope.loggedin).toEqual(true);
		});
		it("should go to right state after logout", inject(function($state) {
			scope.logout();
			expect($state.go).toHaveBeenCalledWith("login");
		}));
	});
});
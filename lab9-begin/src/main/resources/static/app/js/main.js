var wafepa = angular.module("WafepaApp", ['ngRoute']);

wafepa.controller("activitiesCtrl", function($scope, $http, $location){

	var baseUrl = "/api/activities";
	
	$scope.activities = [];
	
	$scope.newActivity = {};
	$scope.newActivity.name = "";
	
	$scope.gotActivities = false;
	
	var getActivities = function(){
		
		var promise = $http.get(baseUrl);
		promise.then(
			function success(data){
				$scope.activities = data.data;
				$scope.gotActivities = true;
			},
			function greska(data){
				console.log(data);
			}
		);		
	}
	
	getActivities();
	
	$scope.addActivity = function(){
		
		var promise = $http.post(baseUrl, $scope.newActivity);
		promise.then(
			function success(data){
				getActivities();
				$scope.newActivity.name = "";
			},
			function error(data){
				alert("Something went wrong!");
			}
		);
	}
	
	$scope.editActivity = function(aid){
		$location.path("/activities/edit/" + aid);
		//alert(aid);
	}
	
	$scope.deleteActivity = function(id){
		
		var promise = $http.delete(baseUrl + "/" + id);
		promise.then(
			function success(data){
				getActivities();
			},
			function error(data){
				alert("Neuspesno brisanje.")
			}
		);
	}

});

wafepa.controller("editActivityCtrl", function($scope, $http, $routeParams, $location){
	
	var baseUrl = "/api/activities/";
	var id = $routeParams.aid;
	
	$scope.oldActivity = {};
	$scope.oldActivity.name = "";
	
	var getActivity = function(){
		$http.get(baseUrl + id).
			then(
				function success(data){
					$scope.oldActivity = data.data;
				},
				function error(data){
					
				}
			);	
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(baseUrl + id, $scope.oldActivity).
			then(
				function uspeh(data){
					$location.path("/activities");
				},
				function error(data){
					alert("Something went wrong!");
				}
			);
	}
	
});


wafepa.controller("standoviCtrl", function($scope, $http){
	
	var baseUrl = "/api/standovi";
	var baseUrlSajmovi = "/api/sajmovi";
	
	$scope.standovi = [];
	$scope.sajmovi = [];
	
	
	$scope.newStand = {};
	$scope.newStand.zakupac = "";
	$scope.newStand.povrsina = "";
	$scope.newStand.sajamId = "";
	
	
	var getStandovi = function(){
		
		$http.get(baseUrl).then(
			function success(data){
				$scope.standovi = data.data;
			},
			function error(data){
				console.log(data);
				alert("Neuspesno dobavljanje standova.")
			}
		);
	}
	
	getStandovi();
	
	var getSajmovi = function(){
		
		$http.get(baseUrlSajmovi).then(
			function success(data){
				$scope.sajmovi = data.data;
			},
			function error(data){
				alert("Neuspesno dobavljanje sajmova.")
			}	
		);
	}
	
	getSajmovi();
	
	$scope.addStand = function(){
		
		$http.post(baseUrl, $scope.newStand).then(
			function success(data){
				getStandovi();
			},
			function error(data){
				alert("Nije uspelo dodavanje standa.");
			}
		);		
	}
	
});



wafepa.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/partial/home.html'
		})
		.when('/activities', {
			templateUrl : '/app/html/partial/activities.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/partial/edit_activity.html'
		})
		.when('/standovi', {
			templateUrl : '/app/html/partial/standovi.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

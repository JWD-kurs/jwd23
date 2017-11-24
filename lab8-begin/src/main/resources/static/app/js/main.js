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
		.otherwise({
			redirectTo: '/'
		});
}]);


var app = angular.module('ordersApp', ['ngRoute']);

var selectedUser = 0;

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/addresses', {
            templateUrl:'views/addresses.html',
            controller: 'AddressController'
        })
        .when('/orders', {
            templateUrl:'views/orders.html',
            controller: 'OrderController'
        });

    $locationProvider.html5Mode(true);



}]);

app.controller('AddressController', ['$scope', '$http', function($scope, $http){
    selectedUser = $scope.idValue;
    //$scope.getAddresses = function(){
    //    console.log('address request sent!');
        $http.get('/api/getAddresses/' + selectedUser, 'data').then(function(response){
            console.log(response.data);
            $scope.addresses = response.data;
        });
    //}

}]);

    app.controller('OrderController', ['$scope', '$http', function($scope, $http){
        selectedUser = $scope.idValue;
        //$scope.getAddresses = function(){
        //    console.log('address request sent!');
        $http.get('/api/getOrders/' + selectedUser, 'data').then(function(response){
            console.log(response.data);
            $scope.orders = response.data;
        });
        //}

}]);

app.controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.getData = function(){
        $http.get('/api/retrieve', 'data').then(function(response){
            //console.log(response.data[selectedUser -1].name);
            $scope.users = response.data;
        });
    }

}]);


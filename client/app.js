angular.module("cryptoMarketApp", [])
.controller("cryptoMarketController", async ($scope, $http) => {


	$scope.getCoin = function() {

		if ($scope.coinSymbol){
			$scope.coinSymbol = $scope.coinSymbol.toUpperCase();
		}

		const url = "http://localhost:3000/coin?search=" + $scope.coinSymbol

		const successCallback = (response) => {
			$scope.result = response.data;
			$scope.result.price_usd = $scope.result.price_usd + "$"
		};
		const errorCallback = (err) => {
			alert(err.data.status + " Coin " + $scope.coinSymbol + " " + err.statusText);
			$scope.result = "";
			$scope.coinSymbol = "";
		};

		$http.get(url).then(successCallback, errorCallback);



	}
	
});

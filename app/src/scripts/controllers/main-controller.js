(function(angular) {
	'use strict';

	angular.module('AngComponents')
		.controller('MainCtrl', ['$scope', function($scope) {
			var vm = this;

			vm.users = [
				{
					name: 'abc'
				}, {
					name: 'xyz'
				}
			];

			return vm;
		}])
		.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
			var vm = this;

			vm.title = 'appCtrl';

			$http.get('/services/getComponentsList')
				.success(function(data) {
					vm.componentsList = data;
				})
				.error(function(msg) {
					console.log('error:', msg);
				});

			return vm;
		}])
		.controller('kshTableCtrl', ['$scope', '$http', 'ngTable', function($scope, $http, ngTable) {
			var vm = this;

			vm.title = 'kshTableCtrl';

			$http.get('/services/getTableData')
				.success(function(data) {
					console.log(data);
				})
				.error(function(msg) {
					console.log(msg);
				});

			return vm;
		}]);
})(angular);
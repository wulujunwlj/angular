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
		.controller('kshTableCtrl', ['$scope', '$http', 'NgTableParams', function($scope, $http, NgTableParams) {
			var vm = this;

			vm.title = 'kshTableCtrl';

			$http.get('/services/getTableData')
				.success(function(data) {
					console.log(data);
					
					vm.tableParams = new NgTableParams({}, { dataset: data });
				})
				.error(function(msg) {
					console.log(msg);
				});

			return vm;
		}])
		.controller('ngFormForCtrl', ['$scope', 'FormForConfiguration', 
			function($scope, FormForConfiguration) {
				var vm = this;

				vm.formData = {};

				vm.validationAndViewRules = {
					email: {
						inputType: 'text',
						pattern: /\w+@\w+\.\w+/,
						required: true
					},
					password: {
						inputType: 'password',
						pattern: {
							rule: /[0-9]/,
							message: 'Your password must contain at least 1 number'
						},
						required: true
					}
				};

				vm.submit = function(data) {
					flashr.now.info('Your form has been submitted.');
				};

				return vm;
			}
		]);
})(angular);
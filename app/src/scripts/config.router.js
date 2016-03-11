(function(angular) {
	'use strict';

	angular.module('AngComponents')		
		.config(['$routeProvider', '$locationProvider', 
			function($routeProvider, $locationProvider) {
				$routeProvider
					.when('/app', {
						templateUrl: 'views/app.html',
						resolve: {
							ngTable: function($ocLazyLoad) {
								$ocLazyLoad.load('ngTable');
							},
							ngFormFor: function($ocLazyLoad) {
								$ocLazyLoad.load('formFor');
							}
						}
					})
					.when('/app/kshTable', {
						templateUrl: 'views/kshTable.html',
						resolve: {
							ngTable: function($ocLazyLoad) {
								// $http.get('services/getTableData')
								// 	.success(function(data) {
								// 		console.log(data);
								// 	})
								// 	.error(function(msg) {
								// 		console.log(msg);
								// 	});

								$ocLazyLoad.load('ngTable');
							}
						}
					})
					.when('/app/formFor', {
						templateUrl: 'views/ng-form-for.html',
						resolve: {
							ngFormFor: function($ocLazyLoad) {
								$ocLazyLoad.load('formFor');
							}
						}
					})
					.otherwise({
						redirectTo: '/app'
					});
			}
		]);
})(angular);
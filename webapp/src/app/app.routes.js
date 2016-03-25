(function(angular) {
	'use strict';

	angular
		.module('app')
		.config(['$stateProvider', '$urlRouterProvider', 
			function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('app/home');

				$stateProvider
					.state('app', {
						abstract: true,
						url: '/app',
						templateUrl: 'src/app/common/app.html',
						resolve: {}
					})
					.state('app.home', {
						url: '/home',
						templateUrl: 'src/app/common/home.html'
					});
			}
		]);
}(angular));
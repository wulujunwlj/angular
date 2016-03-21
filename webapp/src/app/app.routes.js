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
						templateUrl: 'app/app.html',
						resolve: {}
					})
					.state('app.home', {
						url: '/home',
						templateUrl: 'app/home.html'
					});
			}
		]);
}(angular));
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
					})
					.state('app.components', {
						abstract: true,
						url: '/components',
						template: '<div ui-view></div>',
						resolve: {}
					})
					.state('app.components.ngTable', {
						url: '/ngTable',
						templateUrl: 'src/app/components/conow-grid/demo/ng-table-demo.html',
						resolve: {
						}
					});
			}
		]);
}(angular));
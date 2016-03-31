(function(angular) {
	'use strict';

	angular
		.module('components')
		.config(['$urlProvider', '$stateProvider', 
			function($urlProvider, $stateProvider) {
				$stateProvider
					.state('app.components', {
						abstract: true,
						url: '/components',
						template: '<div ui-view></div>',
						resolve: {}
					})
					.state('app.components.ngTable', {
						url: '/ngTable',
						template: 'src/app/components/conow-grid/demo/ng-table-demo.html',
						resolve: {}
					})

			}
		]);
}(angular));
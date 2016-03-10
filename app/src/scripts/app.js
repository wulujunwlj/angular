(function(angular) {
	'use strict';

	angular.module('AngComponents', ['ngRoute', 'oc.lazyLoad'])
		.constant('app', {
			name: 'angular-components',
			version: '0.0.1'
		})
		.value('appConfig', {
			author: 'ksh',
			keyWords: [
				'angular',
				'plugins',
				'front-end'
			],
			isDebug: true,
		})
		.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
			$ocLazyLoadProvider.config({
				debug: true,
				events: true,
				modules: [
					{
						name: 'ngTable',
						files: ['node_modules/ng-table/dist/ng-table.css', 'node_modules/ng-table/dist/ng-table.js']
					}
				]
			});
		}])
})(angular);
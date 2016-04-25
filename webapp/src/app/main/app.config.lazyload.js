(function(angular){
	'use strict';

	angular
		.module('app')
		.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
			$ocLazyLoadProvider.config({
				debug: true,
				events: true,
				modules: [
					{
						name: 'ng-table',
						files: [
							'ng-table/dist/ng-table.js',
						]
					}
				]
			});
		}])
})(angular);
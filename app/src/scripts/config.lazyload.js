(function(angular) {
	'use strict';

	angular.module('AngComponents')
		.config(['$ocLazyLoadProvider', 'appConfig', 
			function($ocLazyLoadProvider, appConfig) {
				var ocLazyLoadConfig = {
					debug: false,
					events: false,
					modules: []
				},
					moduleConfig = {
						name: '',
						files: []
					};

				if (angular.isDefined(appConfig.isDebug)) {
					ocLazyLoadConfig.debug = appConfig.isDebug;
				}

				if (angular.isDefined(appConfig.isLoadModulesEvents)) {
					ocLazyLoadConfig.events = appConfig.isLoadModulesEvents;
				}

				// ngTable module config
				moduleConfig = {
					name: 'ngTable',
					files: [
						'ng-table/dist/ng-table.css',
						'ng-table/dist/ng-table.js'
					]
				};
				ocLazyLoadConfig.modules.push(moduleConfig);

				$ocLazyLoadProvider.config(ocLazyLoadConfig);
			}
		]);
})(angular);
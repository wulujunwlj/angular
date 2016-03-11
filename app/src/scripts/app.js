(function(angular) {
	'use strict';

	angular.module('AngComponents', ['ngRoute', 'oc.lazyLoad'])
		.constant('app', {
			name: 'angular-components',
			version: '0.0.1'
		})
		.constant('appConfig', {
			author: 'ksh',
			keyWords: [
				'angular',
				'plugins',
				'front-end'
			],
			isDebug: false,
			isLoadModulesEvents: false,
		});
})(angular);
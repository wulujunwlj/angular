(function(angular) {
	'use strict';

	angular
		.module('app', ['ui.router', 'oc.lazyLoad'])
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
		})
		.run(['$rootScope', '$window', '$log', 
			function($rootScope, $window, $log) {
				// 
			}
		])
		.controller('appCtrl', ['$scope', function($scope) {
			var vm = this;
			vm.title = 'app title';
		}]);
}(angular));
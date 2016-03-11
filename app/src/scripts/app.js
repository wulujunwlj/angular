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
		})
		.run(['$rootScope', '$window', '$location', '$log', 'appConfig', 
			function($rootScope, $window, $location, $log, appConfig) {

				appConfig.isDebug = false;

				function routeChangeStartFn(evt) {
					$log.log('routeChangeStart');
					$log.log(arguments);
				}

				if (appConfig.isDebug) {
					// $routeChange events
					$rootScope.$on('$routeChangeStart', routeChangeStartFn);
					$rootScope.$on('$routeChangeSuccess', routeChangeSuccessFn);
					$rootScope.$on('$routeChangeError', routeChangeErrorFn);

					// ocLazyLoad events
					$rootScope.$on('ocLazyLoad.moduleLoaded', moduleLoadedFn);
				}

				function routeChangeSuccessFn(evt) {
					$log.log('routeChangeSuccess');
					$log.log(arguments);
				}

				function routeChangeErrorFn(evt) {
					$log.log('routeChangeError');
					$log.log(arguments);
				}

				function moduleLoaded(evt, module) {
					$log.log('module loaded:', module);
				}
			}
		]);
})(angular);
/* 2016-03-11 */
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
;(function(angular) {
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

				// angular-form-for module config
				moduleConfig = {
					name: 'formFor',
					files: [
						'angular-form-for/dist/form-for.css',
						'angular-form-for/dist/form-for.js',
					]
				};
				ocLazyLoadConfig.modules.push(moduleConfig);

				$ocLazyLoadProvider.config(ocLazyLoadConfig);
			}
		]);
})(angular);
;(function(angular) {
	'use strict';

	angular.module('AngComponents')		
		.config(['$routeProvider', '$locationProvider', 
			function($routeProvider, $locationProvider) {
				$routeProvider
					.when('/app', {
						templateUrl: 'views/app.html',
						resolve: {
							ngTable: function($ocLazyLoad) {
								$ocLazyLoad.load('ngTable');
							},
							ngFormFor: function($ocLazyLoad) {
								$ocLazyLoad.load('formFor');
							}
						}
					})
					.when('/app/kshTable', {
						templateUrl: 'views/kshTable.html',
						resolve: {
							ngTable: function($ocLazyLoad) {
								// $http.get('services/getTableData')
								// 	.success(function(data) {
								// 		console.log(data);
								// 	})
								// 	.error(function(msg) {
								// 		console.log(msg);
								// 	});

								$ocLazyLoad.load('ngTable');
							}
						}
					})
					.when('/app/formFor', {
						templateUrl: 'views/ng-form-for.html',
						resolve: {
							ngFormFor: function($ocLazyLoad) {
								$ocLazyLoad.load('formFor');
							}
						}
					})
					.otherwise({
						redirectTo: '/app'
					});
			}
		]);
})(angular);
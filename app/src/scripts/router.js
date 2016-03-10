(function(angular) {
	'use strict';

	angular.module('AngComponents')
		.run(['$rootScope', '$window', '$location', '$log', 'appConfig', 
			function($rootScope, $window, $location, $log, appConfig) {

				appConfig.isDebug = false;

				if (appConfig.isDebug) {
					// $routeChange events
					$rootScope.$on('$routeChangeStart', routeChangeStartFn);
					$rootScope.$on('$routeChangeSuccess', routeChangeSuccessFn);
					$rootScope.$on('$routeChangeError', routeChangeErrorFn);

					// ocLazyLoad events
					$rootScope.$on('ocLazyLoad.moduleLoaded', moduleLoadedFn);

					function routeChangeStartFn(evt) {
						$log.log('routeChangeStart');
						$log.log(arguments);
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
			}
		])
		.config(['$routeProvider', '$locationProvider', 
			function($routeProvider, $locationProvider) {
				$routeProvider
					.when('/app', {
						templateUrl: 'views/app.html',
						controller: 'appCtrl as app',
						resolve: {
							// 
						}
					})
					.when('/app/kshTable', {
						templateUrl: 'views/kshTable.html',
						controller: 'kshTableCtrl as kshTable',
						resolve: {
							ngTable: function($http) {
								$http.get('services/getTableData')
									.success(function(data) {
										console.log(data);
									})
									.error(function(msg) {
										console.log(msg);
									});
							}
						}
					})
					.otherwise({
						redirectTo: '/app'
					});
			}
		]);
})(angular);
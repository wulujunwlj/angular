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
			headerNavSrc: 'src/app/common/header-nav.html',
			leftNavSrc: 'src/app/common/left-nav.html'
		})
		.run(['$rootScope', '$window', '$log', 
			function($rootScope, $window, $log) {
				// 
			}
		])
		.controller('appCtrl', ['$scope', 'app', 'appConfig',
			function($scope, app, appConfig) {
				var vm = this;
				vm.title = app.name;

				vm.headerNavSrc = appConfig.headerNavSrc;
				vm.leftNavSrc = appConfig.leftNavSrc;
			}
		])
		.controller('leftNavCtrl', ['$scope', '$http', 
			function($scope, $http) {
				var vm = this;

				$http
					.get('services/getComponentsList')
					.then(function(res) {
						console.log(res);

						vm.navList = res.data;
					}, function(msg) {
						console.error(msg);
					});
			}
		]);
}(angular));
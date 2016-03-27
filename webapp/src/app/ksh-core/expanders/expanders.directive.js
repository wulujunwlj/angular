(function(angular) {
	'use strict';

	angular
		.module('ksh.core.expanders', [])
		.directive('expanders', ['$http', 
			function($http) {
				var directObj = {
					restrict: 'E',
					templateUrl: 'src/app/ksh-core/expanders.tpl.html',
					compile: function(tElement, tAttrs) {
						return this.link;
					}, 
					controller: function() {
						// 
					},
					link: function($scope, iElm, iAttrs, controller) {
						// 
					}
				};

				return directObj;
			}
		]);
}(angular));
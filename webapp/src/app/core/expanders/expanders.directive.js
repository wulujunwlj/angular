(function(angular) {
	'use strict';

	angular
		.module('core.expanders', [])
		.directive('expanders', ['$http', 
			function($http) {
				var directObj = {
					restrict: 'E',
					templateUrl: 'src/app/core/expanders/expanders.tpl.html',
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
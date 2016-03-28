(function(angular) {
	'use strict';

	angular
		.module('core.accordions', [])
		.directive('accordions', ['$http', 
			function($http) {
				var directObj = {
					restrict: 'E',
					templateUrl: 'src/app/core/accordions/accordions.tpl.html',
					compile: function(tElement, tAttrs) {
						return this.link;
					},
					controller: function() {
						// 
					},
					link: function($scope, iElm, iAttrs, controller) {
						console.log('accordions console');
					}
				};

				return directObj;
			}
		]);
}(angular));
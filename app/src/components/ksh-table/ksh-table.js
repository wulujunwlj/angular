(function(angular) {
	'use strict';

	angular.module('kshTable', [])
		.directive('kshTable', ['$rootScope', 
			function($rootScope) {
				var directiveObj = {
					restrict: 'AE',
					scope: {},
					compile: function(tElem, tAttrs) {
						return this.link;
					},
					controller: function($scope, $element, $attrs, $transclude) {
						// 
					},
					link: function(elem, attrs) {
						// 
					}
				};

				return directiveObj;
			}
		]);
})(angular);
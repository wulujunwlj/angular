(function(angular) {
	'use strict';

	angular
		.module('conowGrid', [])
		.directive('conowGrid', ['', function(){
			return {
				name: '',
				priority: 1,
				terminal: true,
				scope: {}, // {} = isolate, true = child, false/undefined = no change
				controller: 'conowGridCtrl',
				require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: '',
				templateUrl: '',
				replace: true,
				transclude: true,
				compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
				}
			};
		}])
		.controller('conowGridCtrl', ['', function(){
			
		}]);
}(angular));
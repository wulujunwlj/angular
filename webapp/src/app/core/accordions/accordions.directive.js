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
		])
		.directive('accordion', ['$timeout', 
			function($timeout) {
				var directObj = {
					restrict: 'E',
					transclude: true,
					replace: true,
					require: '?^accordions',
					templateUrl: 'src/app/core/accordions/accordion.tpl.html',
					compile: function(tElement, tAttrs) {
						return this.link;
					},
					controller: 'accordionCtrl',
					controllerAs: 'vm',
					link: function($scope, iElm, iAttrs, controller) {
						var vm = $scope.vm;

						vm.title = iAttrs.title || 'title';
						vm.isOpen = false;
						
						vm.toggleAccordion = toggleAccordion;

						function toggleAccordion(evt) {
							evt.preventDefault();

							vm.isOpen = !vm.isOpen;

							evt.stopPropagation();
						}
					}
				};

				return directObj;
			}
		])
		.controller('accordionCtrl', ['$scope', 
			function($scope) {
				$scope.vm = this;
			}
		]);
}(angular));
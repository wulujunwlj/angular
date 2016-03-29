(function(angular) {
	'use strict';

	angular
		.module('core.accordions')
		.filter('accordionFilter', ['$filter', 
			function($filter) {
				function filterFn(input) {
					
					return input.substring(0, 1).toUpperCase() + input.substring(1);
				}

				return filterFn;
			}
		]);
}(angular));
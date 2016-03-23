(function(angular) {
	'use strict';

	angular
		.module('conowGrid')
		.filter('capital', ['$filter', 
			function($filter) {
				var filterFn = function(input) {

					return input.substring(0, 1).toUpperCase() + input.substring(1);
				};

				return filterFn;
			}
		]);
}(angular));
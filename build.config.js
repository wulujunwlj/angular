/**
 * configuration for build process
 */

module.exports = {

	buildRootDir: 'webapp',

	buildDir: 'webapp/build',

	compileDir: 'webapp/bin',

	appFiles: {
		lessFiles: [
			// 
		]
	},

	vendorFiles: {
		jsFiles: [
			'webapp/vendor/angular/angular.js',
			'webapp/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'webapp/vendor/angular-ui-router/release/angular-ui-router.js',
		],
		cssFiles: [
			'webapp/vendor/bootstrap/dist/css/bootstrap.css'
		],
		assetsFiles: [
		]
	},

};
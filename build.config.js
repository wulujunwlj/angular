/**
 * configuration for build process
 */

module.exports = {

	rootDir: 'webapp',

	srcDir: 'src/app',

	buildDir: 'build',

	distDir: 'dist',

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
			'webapp/vendor/angular-ui-router/release/lazyload.js',
		],
		cssFiles: [
			'webapp/vendor/bootstrap/dist/css/bootstrap.css'
		],
		assetsFiles: [
		]
	},

};
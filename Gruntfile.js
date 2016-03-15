
module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');
	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		/**
		 * 文件/目录 删除
		 */
		clean: {
			build: [
				'webapp/build/vendor'
			]
		},

		/**
		 * 文件复制
		 *
		 * vendor 目录需要配置:配置 build.config.js 中的 vendorFiles
		 */
		copy: {
			// buildVendorassets: {
			// 	files: [
			// 		{
			// 			src: [ '<%= vendorFiles.assetsFiles %>' ],
			// 			dest: '<%= buildDir %>/vendor/assets/',
			// 			expand: true,
			// 			flatten: true
			// 		}
			// 	]
			// },

			buildVendorjs: {
				files: [
					{
						src: [ '<%= vendorFiles.jsFiles %>' ],
						dest: '<%= buildDir %>/vendor/scripts/',
						flatten: true,
						expand: true
					}
				]
			},

			buildVendorcss: {
				files: [
					{
						src: [ '<%= vendorFiles.cssFiles %>' ],
						dest: '<%= buildDir %>/vendor/styles/',
						flatten: true,
						expand: true
					}
				]
			},

			buildApp: {
				files: [
					{
						src: 
					}
				]
			}
		},

		/**
		 * build 生成首页文件
		 */
		index: {
			build: {
				dir: '<%= buildDir %>',
				src: [
					'<%= vendorFiles.jsFiles %>',
					'<%= buildDir %>/src/**/*.js',
					'vendorFiles.cssFiles',
					'<%= buildDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
				]
			},

			compile: {
				dir: '<%= compileDir %>',
				src: [
					'<%= vendorFiles.cssFiles %>',
					'<%= buildDir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
				]
			}
		},

	};


	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask( 'default' , 'This is the default task of ' + taskConfig.pkg.name + ' grunt', function() {
		grunt.log.writeln('This is the default task of ' + taskConfig.pkg.name + ' grunt');
		
		// grunt.log.writeln(grunt.config()['pkg']['name']);
	});

	function filterForJS (files) {
		return files.filter( function ( file ) {
			return file.match(/\.js$/);
		});
	}

	function filterForCSS ( files ) {
		return files.filter( function (file) {
			return file.match(/\.css$/);
		});
	}

	/**
	 * 动态编译 js 和 css 文件到首页
	 */
	grunt.registerMultiTask('index', 'Process index.html template', function () {
		var dirRE = new RegExp( '^(' + grunt.config('buildDir') + '|' + grunt.config('compileDir') + ')\/', 'g' );
		var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
		  return file.replace( dirRE, '' );
		});
		var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
		  return file.replace( dirRE, '' );
		});

		grunt.file.copy(userConfig.buildRootDir + '/src/index.html', userConfig.buildRootDir + '/build/index.html', {
			process: function ( contents, path ) {
				return grunt.template.process( contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config( 'pkg.version' )
					}
				})
			}
		})
	});

	grunt.registerTask('copyVendorFiles', ['copy']);

	grunt.registerTask('cleanBuild', ['clean']);

	grunt.registerTask('build', [
		'clean', 'copy:buildVendorjs', 'copy:buildVendorcss',
		// 'clean', 'copy', 'index:build'
	]);

};
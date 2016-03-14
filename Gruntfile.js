
module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		concat: {
			options: {
				separator: '\n;',
				banner: '/* <%= grunt.template.date("yyyy-mm-dd") %> */\n'

			},
			dist: {
				src: [
					'<%= pkg.gruntConfig.srcDirRoot %>/scripts/app.js', 
					'<%= pkg.gruntConfig.srcDirRoot %>/scripts/config.lazyload.js', 
					'<%= pkg.gruntConfig.srcDirRoot %>/scripts/config.router.js'
				],
				dest: '<%= pkg.gruntConfig.destDirRoot %>/main.js',
			}
		},

		jshint: {
			// all: ['Gruntfile.js', '<%= pkg.gruntConfig.srcDirRoot %>/scripts/*.js']
			beforeconcat: [
				'<%= pkg.gruntConfig.srcDirRoot %>/scripts/app.js', 
				'<%= pkg.gruntConfig.srcDirRoot %>/scripts/config.lazyload.js', 
				'<%= pkg.gruntConfig.srcDirRoot %>/scripts/config.router.js'
			],
			afterconcat: [
				'<%= pkg.gruntConfig.destDirRoot %>/main.js'
			]
		},

		ngAnnotate: {
			options: {
				singleQuotes: true,
			},
			app1: {
				files: {
					'<%= pkg.gruntConfig.destDirRoot %>/main-controller.annotated.js': ['<%= pkg.gruntConfig.srcDirRoot %>/scripts/controllers/main-controller.js']
				}
			},
			app2: {
				files: {
					expand: true,
					src: '<%= pkg.gruntConfig.srcDirRoot %>/scripts/controllers/*.js',
					ext: '.annotated.js',
					extDot: 'last',
				}
			}
		},

		html2js: {
			options: {
				base: 'app',
				module: 'myApp.templates',
				singleModule: true,
				useStrict: true,
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				}
			},
			main: {
				src: ['app/scripts/**/*.html'],
				dest: 'app/scripts/populate_template_cache.js'
			}
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-ng-annotate');
	// grunt.loadNpmTasks('load-grunt-tasks');

	grunt.registerTask('default', 'Default task', function() {
		grunt.log.writeln('This is the default task running...');
	});

	grunt.registerTask('concatMain', ['concat:dist']);

	grunt.registerTask('jshintMain', ['jshint:all']);

	grunt.registerTask('annotationCtrls', ['ngAnnotate:app1']);
};

module.exports = function (grunt) {
	'use strict';

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
					'<%= pkg.gruntConfig.srcDirRoot %>/scripts/router.js'
				],
				dest: '<%= pkg.gruntConfig.destDirRoot %>/main.js',
			}
		},

		jshint: {
			all: ['Gruntfile.js', '<%= pkg.gruntConfig.srcDirRoot %>/scripts/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', 'Default task', function() {
		grunt.log.writeln('This is the default task running...');
	});

	grunt.registerTask('concatMain', ['concat:dist']);

	grunt.registerTask('jshintMain', ['jshint:all']);
};
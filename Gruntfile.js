
module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');

	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		clean: {
			dev: {
				src: '<%= buildDir %>/main.js'
			}
		},
		uglify: {},
		concat: {
			options: {
				seporator: ';',
				banner: '/* ! <%= pkg.name %> - v<%= pkg.version %> - ' + 
					' <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			dev: {
				files: {
					'<%= buildDir %>/scripts/app.js': [
						'<%= srcDir %>/app.module.js', 
						'<%= srcDir %>/app.config.js', 
						'<%= srcDir %>/app.routes.js',
						'<%= srcDir %>/app.config.lazyload.js'
					],
				}
			}
		},
		copy: {},
		less: {
			options: {
				banner: '/* ! <%= pkg.name %> - v<%= pkg.version %> - ' + 
					' <%= grunt.template.today("yyyy-mm-dd") %> */\n ',
			},
			dev: {
				files: {
					'<%= buildDir %>/styles/app.css': ['<%= srcDir%>/*.less'],
					'<%= buildDir %>/styles/common.css': ['<%= srcDir %>/common/*.less']
				}
			},
			prod: {}
		},
		cssmin: {},
		watch: {}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认的任务，不进行任何操作，只做功能基础验证
	grunt.registerTask('default', 'This is the default task.', 
		function() {
			grunt.log.writeln('This is the default task, which did nothing.');
		}
	);

	// 生成开发环境的 app 入口文件 <%= srcDir %>/
	grunt.registerTask('buildApp', 'build main files for project.', 
		function() {
			grunt.task.run('concat:dev');
			grunt.task.run('less:dev');
		}
	);

	// 删除开发环境生成的文件 <%= buildDir %>/
	grunt.registerTask('cleanApp', 'clean build app files for project.', 
		function() {
			grunt.task.run('clean:dev');
		}
	);

	// 开发环境一次完整的构建过程
	grunt.registerTask('build', 'Build task for project.', 
		function() {
			grunt.task.run('less:dev');
			grunt.task.run('concat:dev');
		}
	);
};
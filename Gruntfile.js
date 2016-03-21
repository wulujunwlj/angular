var fs = require('fs');

module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');
	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		concat: {
			buildCss: {
				src: ['<%= buildDir %>/assets/styles/*.css', '!<%= buildDir %>/assets/styles/*.min.css'],
				dest: '<%= buildDir %>/assets/styles/main.css',
			},
			distCss: {
				src: ['!<%= buildDir %>/assets/styles/*.css', '<%= buildDir %>/assets/styles/*.min.css'],
				dest: '<%= distDir %>/assets/styles/main.min.css',		
			},
			buildJs: {
				// 
			},
			components: {
				src: ['<%= componentDir %>/*.js', '!<%= componentDir %>/*.spec.js'],
				dest: 'webapp/build/test/<%= componentName %>.js',
			},
		},

	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('load-grunt-tasks');

	grunt.registerTask( 'default' , 'This is the default task of ' + taskConfig.pkg.name + ' grunt', function() {
		grunt.log.writeln('This is the default task of ' + taskConfig.pkg.name + ' grunt');
		
		// grunt.log.writeln(grunt.config()['pkg']['name']);
	});

	// 读取 components 目录，获取其中的组件结构(每个组件对应生成一个文件)
	grunt.registerTask('readDir', 'Read Directory', function() {
		var rootDir = 'webapp/src';
		var dirList = [];		// 保存动态读取的目录
		var componentName = '';
		var componentDir = '';
		var dir = '';
		var obj = {};

		(function walk(path) {
			var items = fs.readdirSync(path);

			items.forEach(function (item) {
				if (fs.statSync(path + '/' + item).isDirectory()) {
					dirList.push(path + '/' + item);
					walk(path + '/' + item);
				}
			});

		})('webapp/src/app/components');

		for (var i = 0; i < dirList.length; i++) {
			dir = dirList[i];
			componentName = dir.substring(dir.lastIndexOf('/') + 1);
			componentDir = dir;
			obj[componentName] = componentDir;

			grunt.config.componentDir = componentDir;
			grunt.config.componentName = componentName;
			grunt.task.run('concat:components');
		}

		// grunt.config.component = 'webapp/src/app/components/conow-grid';
		// grunt.task.run('uglify:components');
		
		// grunt.file.write('webapp/src/dirList.json', JSON.stringify(obj));
		// userConfig.componentsObj = obj;
	});

};
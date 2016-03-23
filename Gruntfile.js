var fs = require('fs');

module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');
	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		clean: {
			buildAll: {
				src: '<%= rootDir %>/<%= buildDir %>'
			},
			distAll: {
				src: '<%= rootDir %>/<%= distDir %>'
			},
		},

		uglify: {
			options: {},
			// buildJs: {
			// 	files: [{
			// 		expand: true,
			// 		cwd: '<%= rootDir %>/<%= buildDir %>/src',
			// 		src: ['**/*.js', '!**/*.min.js'],
			// 		dest: '<%= rootDir %>/<%= buildDir %>/src',
			// 		ext: '.min.js'
			// 	}]
			// }
		},

		concat: {
			options: {
				banner: '/* <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
				separator: ';\n'
			},
			buildCss: {
				src: ['<%= rootDir %>/<%= buildDir %>/assets/styles/*.css', '!<%= rootDir %>/<%= buildDir %>/assets/styles/*.min.css'],
				dest: '<%= rootDir %>/<%= buildDir %>/assets/styles/main.css',
			},
			distCss: {
				src: ['!<%= rootDir %>/<%= buildDir %>/assets/styles/*.css', '<%= rootDir %>/<%= buildDir %>/assets/styles/*.min.css'],
				dest: '<%= rootDir %>/<%= distDir %>/assets/styles/main.min.css',
			},
			buildJs: {
				// 
			},
			components: {
				files: [{
					expand: true,
					cwd: '<%= rootDir %>/<%= srcDir %>',
					src: ['**/*.js', '!**/*.spec.js'],
					dest: '<%= rootDir %>/<%= buildDir %>/src/',
					ext: '.js',
					extDoc: 'first'
				}],

			},
		},

		copy: {
			options: {},
			less: {
				files: [{
					expand: true,
					cwd: '<%= rootDir %>/<%= srcDir %>',
					src: ['**/*.less'],
					dest: '<%= rootDir %>/<%= buildDir %>/less',
					flatten: true
				}]
			},
		},

		less: {
			options: {},
			build: {
				files: {
					'<%= rootDir %>/<%= buildDir %>/styles/components.css': ['<%= rootDir %>/<%= buildDir %>/less/*.less'],
				}
			},
		},

		cssmin: {
			options: {},
			// build: [{
			// 	expand: true,
			// 	cwd: 'webapp/build/styles',
			// 	src: ['components.css'],
			// 	dest: 'webapp/build/styles',
			// 	ext: '.min.css'
			// }]
			build: {
				files: {
					'<%= rootDir %>/<%= buildDir %>/styles/components.min.css': ['<%= rootDir %>/<%= buildDir %>/styles/**.css', '!<%= rootDir %>/<%= buildDir %>/styles/**.min.css'],
				}
			}
		},

		watch: {
			options: {},
			configFiles: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js', 'build.config.js']
			},

			buildCss: {
				files: ['<%= rootDir %>/<%= srcDir %>/**/*.less'],
				tasks: ['copy:less', 'less:build', 'cssmin'],
			},

			uglifyCss: {
				files: ['<%= rootDir %>/<%= buildDir %>/styles/*.css'],
				tasks: ['cssmin:build'],
			},

			buildJs: {
				files: ['<%= rootDir %>/<%= srcDir %>/**/*.js', '!<%= rootDir %>/<%= srcDir %>/**/*.spec.js'],
				tasks: ['concat:components'],
			},
		},

	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('load-grunt-tasks');

	grunt.registerTask('default', 'This is the default task of ' + taskConfig.pkg.name + ' grunt', function() {
		grunt.log.writeln('This is the default task of ' + taskConfig.pkg.name + ' grunt');

		// grunt.log.writeln(grunt.config()['pkg']['name']);
	});

	/**
	 * 删除 build 目录
	 */
	grunt.registerTask('cleanBuildAll', 'Clean the build directory.', ['clean:buildAll']);

	/**
	 * initComponent
	 * @param 组件名称
	 * @param [组件根目录]:默认是 webapp/src/app/components/
	 * 
	 *
	 * description:运行命令 grunt initComponent:conow-tab将会在 webapp/src/app/components/ 目录下生成对应的组件初始化结构，
	 * 	可以通过 filesSuffixArr, dirArr 配置生成的文件后缀和路径 
	 */
	grunt.registerTask('initComponent', 'Initialization a component directory.',
		function init() {
			var filesSuffixArr = ['.directive.js', '.service.js', '.filter.js', '.less', '.tpl.html'],
				dirArr = ['demo'],
				rootDir = grunt.config('rootDir') + '/' + grunt.config('srcDir') + '/components/',
				iLen = 0;

			if (arguments.length === 0) {
				grunt.log.writeln('请输入组件名称');

				return false;
			} else {
				if (arguments.length > 1) {
					rootDir = arguments[1];
				}
				grunt.log.writeln('组件初始化中...');
				rootDir += arguments[0];

				// 生成配置文件
				iLen = filesSuffixArr.length;
				for (var i = 0; i < iLen; i++) {
					grunt.file.write(rootDir + '/' + arguments[0] + filesSuffixArr[i]);
				}

				// 生成配置目录
				iLen = dirArr.length;
				for (var i = 0; i < iLen; i++) {
					grunt.file.mkdir(rootDir + '/' + dirArr[i]);
				}

				grunt.log.writeln('组件初始化成功！');

				return true;
			}
		}
	);

	/**
	 * 读取文件目录下的所有子目录
	 * @param  {[type]} rootDir [description]
	 * @return {[type]}         [description]
	 */
	function readDir(rootDir) {
		var dirList = []; // 保存动态读取的目录

		(function walk(path) {
			var items = fs.readdirSync(path);

			items.forEach(function(item) {
				if (fs.statSync(path + '/' + item).isDirectory()) {
					dirList.push(path + '/' + item);
					walk(path + '/' + item);
				}
			});
		})(rootDir);

		return dirList;
	}

	/**
	 * 读取 components 目录，获取其中的组件结构(每个组件对应生成一个文件)
	 */
	grunt.registerTask('concatComponents', 'Concat components files.', function() {
		var rootDir = grunt.config('rootDir') + '/src';
		var dirList = [];
		var componentName = '';
		var componentDir = '';
		var dir = '';

		dirList = readDir(rootDir);
		for (var i = 0; i < dirList.length; i++) {
			dir = dirList[i];
			componentName = dir.substring(dir.lastIndexOf('/') + 1);
			componentDir = dir;

			grunt.config.componentDir = componentDir;
			grunt.config.componentName = componentName;

			grunt.task.run('concat:components');
			// grunt.task.run('uglify:buildJs');
		}

	});

	// grunt.registerTask('copyLess', 'Copy less files to build directory.', ['copy:less']);

	grunt.registerTask('buildLess', 'Copy and build less to styles.', ['copy:less', 'less:build']);

	grunt.event.on('watch', function(action, filepath, target) {
		console.log('Watching is running...')
		// console.log(target);

		grunt.task.run('concatComponents');
		// grunt.task.run('uglify:buildJs');

	});

	// grunt.registerTask('buildAuto', 'Watching build files and auto build.', ['watch:buildCss']);

	grunt.registerTask('test', 'This is a task for testing.', 
		function() {
			grunt.log.writeln(grunt.config('rootDir'));
			grunt.log.writeln(grunt.config('srcDir'));
		}
	);

};
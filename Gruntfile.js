var fs = require('fs');

module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');
	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		clean: {
			buildJs: {
				src: '<%= rootDir %>/<%= buildDir %>/src'
			},
			buildAll: {
				src: '<%= rootDir %>/<%= buildDir %>'
			},
			distAll: {
				src: '<%= rootDir %>/<%= distDir %>'
			},
			css: {
				src: ['<%= rootDir %>/<%= buildDir %>/less', '<%= rootDir %>/<%= buildDir %>/styles']
			},
			js: {
				src: ['<%= rootDir %>/<%= buildDir %>/src']
			}
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
				src: ['!<%= rootDir %>/<%= buildDir %>/styles/app.css', '<%= rootDir %>/<%= buildDir %>/styles/**/*.css', '!<%= rootDir %>/<%= buildDir %>/styles/**/*.min.css'],
				dest: '<%= rootDir %>/<%= buildDir %>/styles/app.css',
			},
			distCss: {
				src: ['!<%= rootDir %>/<%= buildDir %>/styles/*.css', '<%= rootDir %>/<%= buildDir %>/styles/*.min.css'],
				dest: '<%= rootDir %>/<%= distDir %>/styles/main.min.css',
			},
			buildJs: {
				// 
			},
			module: {
				files: [{
					expand: true,
					cwd: 'filePath',
					src: ['*.js', '!*.js'],
					dest: ''
				}]
			},
			modules: {
				files: [{
					expand: true,
					cwd: '<%= rootDir %>/<%= srcDir %>',
					src: ['**/*.module.js', '**/*.config.js', '**/*.config.lazyload.js', '**/*.routes.js'],
					dest: '<%= rootDir %>/<%= buildDir %>/src',
					ext: '.js',
					extDoc: 'first'
				}]
			},
			components: {
				files: [{
					expand: true,
					cwd: '<%= rootDir %>/<%= srcDir %>',
					// src: ['**/*.js', '!**/*.spec.js'],
					src: ['**/*.directive.js', '**/*.service.js', '**/*.filter.js'],
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
					// flatten: true
				}]
			},
		},

		less: {
			options: {},
			build: {
				// files: {
				// 	'<%= rootDir %>/<%= buildDir %>/styles/components.css': ['<%= rootDir %>/<%= buildDir %>/less/*.less'],
				// },
				files: [{
					expand: true,
					cwd: '<%= rootDir %>/<%= buildDir %>/less',
					src: ['**/*.less'],
					dest: '<%= rootDir %>/<%= buildDir %>/styles',
					ext: '.css'
				}]
			},

			bizLess: {
				files: {
					'<%= rootDir %>/<%= srcDir %>/common/common.css': ['<%= rootDir %>/<%= srcDir %>/common/*.less'],
				}
			}
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
					'<%= rootDir %>/<%= buildDir %>/styles/app.min.css': ['<%= rootDir %>/<%= buildDir %>/styles/**.css', '!<%= rootDir %>/<%= buildDir %>/styles/**.min.css'],
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

			bizLess: {
				files: ['<%= rootDir %>/<%= srcDir %>/common/*.less'],
				tasks: ['less:bizLess']
			},

			// 开发时的 watch 方法，包括 Gruntfile 配置文件、less编译、js合并
			develop: {
				options: {
					reload: true,
				},
				files: [
					'Gruntfile.js', 
					'build.config.js', 
					'<%= rootDir %>/<%= srcDir %>/**/*.less',
					// '<%= rootDir %>/<%= buildDir %>/styles/*.css',
					// '!<%= rootDir %>/<%= buildDir %>/styles/app.css',
					// '!<%= rootDir %>/<%= buildDir %>/styles/app.min.css',
					'<%= rootDir %>/<%= srcDir %>/**/*.js',
					'!<%= rootDir %>/<%= srcDir %>/**/*.spec.js'
				]
			}
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
	 *
	 * @ 第二个参数可以指定在app下的哪个目录初始化指令(默认是在 components)
	 */
	grunt.registerTask('initComponent', 'Initialization a component directory.',
		function init() {
			var filesSuffixArr = ['.directive.js', '.service.js', '.filter.js', '.less', '.tpl.html'],
				dirArr = ['demo'],
				rootDir = grunt.config('rootDir') + '/' + grunt.config('srcDir'),

				iLen = 0;

			if (arguments.length === 0) {
				grunt.log.writeln('请输入组件名称');

				return false;
			} else {
				if (arguments.length > 1) {
					rootDir += '/' + arguments[1] + '/' + arguments[0];
				} else {
					rootDir += '/components/' + arguments[0];
				}
				grunt.log.writeln('组件路径：', rootDir);
				grunt.log.writeln('组件初始化中...');

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
grunt.log.writeln('dirList:', dirList);
		for (var i = 0; i < dirList.length; i++) {
			dir = dirList[i];
			componentName = dir.substring(dir.lastIndexOf('/') + 1);
			componentDir = dir;

			grunt.config.componentDir = componentDir;
			grunt.config.componentName = componentName;

			grunt.task.run('concat:modules');
			grunt.task.run('concat:components');
			// grunt.task.run('uglify:buildJs');
		}

	});

	grunt.registerTask('concatComponent', 'Concat component files.', function() {

	});

	// grunt.registerTask('copyLess', 'Copy less files to build directory.', ['copy:less']);

	grunt.registerTask('buildLess', 'Copy and build less to styles.', ['copy:less', 'less:build']);

	/**
	 * grunt watch develop 运行任务，监控 less 和 js 文件变化
	 */
	grunt.event.on('watch', function(action, filepath, target) {
		console.log('Watching is running...')
		var buildSrc = grunt.config('rootDir') + '/' + grunt.config('srcDir');
		// 处理不同系统的路径分隔符不一致
		buildSrc = buildSrc.replace(/\//g, '\\');	
		filepath = filepath.replace(/\//g, '\\');

		// grunt.task.run('clean:buildJs');
		// grunt.task.run('concatComponents');
		// grunt.task.run('uglify:buildJs');
		
		// src files
		if (filepath.indexOf(buildSrc) > -1) {
			if (filepath.indexOf('.less') > -1) {
grunt.log.writeln('less');
				// run less task
				grunt.task.run(['clean:css', 'copy:less', 'less:build', 'concat:buildCss', 'cssmin:build']);

				// grunt.task.run('clean:css');

				// grunt.task.run('copy:less');
				// grunt.task.run('less:build');
				// grunt.task.run('concat:buildCss');
				// grunt.task.run('cssmin:build');
			} else if (filepath.indexOf('.js') > -1) {
grunt.log.writeln('js');
				// run js task
				// grunt.task.run(['clean:js', 'concatComponents']);
				// grunt.task.run('concatComponents');
				grunt.log.writeln(filepath);
				grunt.config.filePath = filepath;

				// grunt.task.run('clean:js');
				// grunt.task.run('concatComponents');
			}
		} 
		// other files
		else {
grunt.log.writeln('others');
			// 
		}

	});

	// grunt.registerTask('buildAuto', 'Watching build files and auto build.', ['watch:buildCss']);

	grunt.registerTask('test', 'This is a task for testing.', 
		function() {
			grunt.log.writeln(grunt.config('rootDir'));
			grunt.log.writeln(grunt.config('srcDir'));
		}
	);

	// grunt.registerTask('develop', 'Task for developing.', ['watch:configFiles', 'watch:buildJs']);

};
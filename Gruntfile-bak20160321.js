var fs = require('fs');

module.exports = function(grunt) {
	'use strict';

	var userConfig = require('./build.config.js');
	var taskConfig = {
		pkg: grunt.file.readJSON('./package.json'),

		/**
		 * 文件/目录 删除
		 */
		clean: {
			cleanVendorFiles: [
				'webapp/build/vendor/'
			],
			cleanAssets: [
				'webapp/build/assets/'
			],
			cleanAssetsStyles: [
				'<%= buildDir %>/assets/styles/'
			],
			build: [
				'<%= buildDir %>/'
			],
			dist: [
				'webapp/dist/'
			]
		},

		uglify: {
			options: {
				// 
			},
			build: {
				files: {
					'<%= buildDir %>/src/app.min.js': ['<%= srcDir %>/app.js'],
					'<%= buildDir %>/src/components/components.min.js': ['<%= srcDir %>/components/*.js'],
				}
			},
			dist: {
				files: {
					'<%= buildDir %>/src/app.min.js': ['<%= srcDir %>/app.js'],
					'<%= distDir %>/src/components/components.min.js': ['<%= srcDir %>/components/*.js'],
				}
			},
			testFile: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>',
					src: ['**/*.js', '!**/*.spec.js'],
					dest: '<%= buildDir %>/dest/'
				}]
			},
			components: {
				files: [{
					expand: true,
					cwd: '<%= component %>',
					src: ['*.js', '!*.spec.js'],
					dest: '<%= buildDir %>/src/test/'
				}]
			},
		},

		/**
		 * 文件复制
		 *
		 * vendor 目录需要配置 build.config.js 中的 vendorFiles
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

			copyLess: {
				files: [
					{
						src: ['webapp/src/app/components/**/*.less'],
						dest: '<%= buildDir %>/assets/less/',
						flatten: true,
						expand: true
					}
				]
			},
		},

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
				src: ['<%= componentDir %>/*.js', '!<%= componentDir %>/*.spec.js']
				dest: 'webapp/build/test/<%= componentName %>.js',
			},
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

		less: {
			build: {
				expand: true,
				cwd: '<%= buildDir %>/assets/less/',
				src: ['**/*.less'],
				dest: '<%= buildDir %>/assets/styles/',
				ext: '.css'
			},
			dist: {
				files: {
					// '<%= distDir %>/assets/styles/<%= pkg.name %>-<%= pkg.version %>.css': '<%=  %>'
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				banner: '/*! <%= pkg.name => <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
				beautify: {
					// 中文 ascii 化，防止中文乱码
					ascii_only: true
				}
			},
			build: {
				files: [
					{
						expand: true,
						cwd: '<%= buildDir %>/assets/styles/',
						src: ['*.css', '!*.min.css'],
						dest: '<%= buildDir %>/assets/styles/',
						ext: '.min.css'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'webapp/build/assets/styles/',
						src: ['*.css', '!*.min.css'],
						dest: 'webapp/build/assets/styles',
						ext: '.min.css'
					}
				]	
			},
			compress: {
				files: {
					'<%= buildDir %>/assets/styles/main.css': ['<%= buildDir %>/assets/styles/*.css']
				}
			},
			compressMin: {
				files: {
					'assets/styles/main.min.css': ['<%= webapp/build/assets/styles/*.min.css %>']
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'build.config.js', '<%= buildRootDir %>/src/**/*.js']
		},

		watch: {
			options: {
				//
			},
			copy: {
				files: '<%= srcDir %>/components/**/*.less',
				tasks: ['clean:cleanAssetsStyles', 'copy:copyLess', 'less:build', 'concat:buildCss']
			}
		},

	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

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
				});
			}
		});
	});

	// grunt.registerTask('copyVendorFiles', ['copy']);

	// grunt.registerTask('cleanBuild', ['clean']);

	// grunt.registerTask('build', [
	// 	'clean', 'copy:buildVendorjs', 'copy:buildVendorcss',
	// 	// 'clean', 'copy', 'index:build'
	// ]);

	grunt.registerTask('cleanBuild', ['clean:build']);
	grunt.registerTask('buildCss', ['clean:cleanAssetsStyles', 'copy:copyLess', 'less:build', 'concat:buildCss']);
	// grunt distCss 之前先执行 grunt buildCss
	grunt.registerTask('distCss', ['concat:distCss']);

	grunt.registerTask('buildJs', ['jshint:all', 'uglify:build']);
	grunt.registerTask('distJs', ['jshint:all', 'uglify:dist']);

	grunt.registerTask('dist', []);

	grunt.registerTask('compressFile', ['uglify:testFile']);

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

	grunt.registerTask('compressComponents', ['uglify:components']);

};
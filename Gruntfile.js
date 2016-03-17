
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
				'<%= buildDir %>/styles/'
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
					'<%= buildDir %>/src/components/components.min.js': ['<%= srcDir %>/components/*.js'],
				}
			}
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

	};

	grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

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

	grunt.registerTask('buildJs', ['uglify:build']);
	grunt.registerTask('distJs', ['uglify:dist']);

	grunt.register('dist', []);

};
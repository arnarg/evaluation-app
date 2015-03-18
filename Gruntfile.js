module.exports = function (grunt) {
	var taskConfig = {
		pkg: grunt.file.readJSON('package.json'),

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		jshint: {
			options: {
				curly:  true,
				immed:  true,
				newcap: true,
				noarg:  true,
				sub:    true,
				boss:   true,
				eqnull: true,
				node:   true,
				undef:  true,
				globals: {
					_:       false,
					jQuery:  false,
					angular: false,
					moment:  false,
					console: false,
					$:       false,
					io:      false
				}
			},
			src: ['src/js/app.js', 'src/js/**/*.js'],
			gruntfile: ['Gruntfile.js']
		},
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['src/js/app.js', 'src/js/**/*.js'],
				dest: 'src/dest/app.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'public/js/app.js': ['src/dest/app.js']
				}
			}
		},
		less: {
			development: {
                files: {"public/css/main.css": "src/less/main.less"}
            },
            production: {
                options: {
                    cleancss: true
                },
                files: {"public/css/main.css": "src/less/main.less"}
            }
		}
	};

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-karma');
	grunt.initConfig(taskConfig);
};

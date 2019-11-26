module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            all: ['src/**/*.html']
        },
        htmlmin: {
            options: {
                options: {
                    compress: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    /* removeAttributeQuotes: true, */
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
            },
            dist: {
                src: 'src/index.html',
                dest: 'dist/index.html'
            }
        },
        express: {
            all: {
                options: {
                    port: 9001,
                    hostname: '0.0.0.0',
                    bases: ['dist'],
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port %>'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['htmlhint', 'htmlmin']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['htmlhint', 'htmlmin']
            }
        }
    });

    grunt.registerTask('serve', [
        'htmlhint',
        'htmlmin',
        'express',
        'open',
        'watch'
    ]);
};
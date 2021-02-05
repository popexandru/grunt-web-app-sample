module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n;/* -- sep -- */\n\n'
            },
            public : {
                src: [ 'public/dev-js/**/*.js' ],
                dest: 'public/js/<%= pkg.name %>.js'
            },
            admin : {
                src: [ 'admin/dev-js/**/*.js' ],
                dest: 'admin/js/<%= pkg.name %>.js'
            }
        },
        less: {
            development: {
                options: {
                    compress        : false,
                    yuicompress     : false,
                    optimization    : 2,
                    cleancss        : false,
                    /*paths           : [
                        "public/less",
                        "admin/less"
                    ],*/
                    syncImport      : false,
                    strictUnits     : false,
                    strictMath      : true,
                    strictImports   : true,
                    ieCompat        : false
                },
                files: [
                    {
                        expand  : true,
                        cwd     : 'public/less/',
                        src     : "**/*.less",
                        dest    : "public/css/",
                        ext     : ".css",
                        extDot  : 'last'
                    },{
                        expand  : true,
                        cwd     : 'admin/less/',
                        src     : "**/*.less",
                        dest    : "admin/css/",
                        ext     : ".css",
                        extDot  : 'last'
                    }
                ]
            },
            production:{
                options: {
                    compress        : true,
                    yuicompress     : true,
                    optimization    : 2,
                    cleancss        : false,
                    /*paths           : [
                        "public/less",
                        "admin/less"
                    ],*/
                    syncImport      : false,
                    strictUnits     : false,
                    strictMath      : true,
                    strictImports   : true,
                    ieCompat        : false
                },
                files: [
                    {
                        expand  : true,
                        cwd     : 'public/less/',
                        src     : "**/*.less",
                        dest    : "public/css/",
                        ext     : ".min.css",
                        extDot  : 'last'
                    },{
                        expand  : true,
                        cwd     : 'admin/less/',
                        src     : "**/*.less",
                        dest    : "admin/css/",
                        ext     : ".min.css",
                        extDot  : 'last'
                    }
                ]
            }
        },
        uglify: {
            // options: {
            //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
            // },
            public : {
                src: 'public/js/<%= pkg.name %>.js',
                dest: 'public/js/<%= pkg.name %>.min.js'
            },
            admin : {
                src: 'admin/js/<%= pkg.name %>.js',
                dest: 'admin/js/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'public/dev-js/**/*.js',
                'admin/dev-js/**/*.js'
            ],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery      : true,
                    console     : true,
                    module      : true,
                    document    : true
                }
            }
        },
        watch: {
            js: {
                files: [ '<%= jshint.files %>' ],
                tasks: [ 'jshint', 'concat', 'uglify' ]
            },
            less : {
                files: [
                    'assets/less/**/*.less',
                    'public/less/**/*.less',
                    'admin/less/**/*.less'
                ],
                tasks: [ 'less' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'less', 'watch' ]);
};

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: 'public/index.html',
        dest: 'dist/index.html'
      }
    },
    qiniu_qupload: {
      default_options: {
        options: {
          ak: 'QINIU_AK',
          sk: 'QINIU_SK',
          bucket: 'app-reformat',
          assets: [{src: 'dist', prefix: ''}]
        }
      }
    },
    uglify: {
      'dist/bundle.js': 'public/bundle.js'
    },
    cssmin: {
      'dist/layout.css': 'public/layout.css'
    },
    copy: {
      'dist/favicon.ico': 'public/favicon.ico'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('@wangding/grunt-qiniu-qupload');
  grunt.loadTasks('./grunt-task');

  grunt.registerTask('default', ['build', 'cssmin', 'htmlmin', 'uglify', 'copy']);
  grunt.registerTask('upload', ['qiniu_qupload']);
};

/*
 * grunt-build-countdown
 * https://github.com/cheee6y/grunt-build-countdown
 *
 * Copyright (c) 2015 Emma Chee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    build_countdown: {
      countdown: {
        src: 'test/data/countdown.json',
        dest: 'dist/stages/',
        previous: ['test/data/previous/previous.htm', 'test/data/previous/previous-item.htm']
      }
    },
    build_previous: {
      countdown: {
        src: 'test/data/countdown.json',
        dest: 'dist/stages/',
        previous: ['test/data/previous/previous.htm', 'test/data/previous/previous-item.htm']
      }
    },
    build_hero: {
      countdown: {
        src: 'test/data/countdown.json',
        dest: 'dist/stages/',
        hero: ['test/data/hero/hero.htm']
      }
    },
    build_latest: {
      countdown: {
        src: 'test/data/countdown.json',
        dest: 'dist/stages/',
        latest: ['test/data/latest/latest.json']
      }
    },
    build_full_countdown: {
      countdown: {
        src: 'test/data/countdown.json',
        dest: 'dist/stages/',
        countdown: ['test/data/1-100/1-100.htm', 'test/data/1-100/1-100-item.htm', 'test/data/1-100/1-100-item-blurb.htm']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'build_countdown', 'nodeunit']);
  grunt.registerTask('previous', ['build_previous']);
  grunt.registerTask('hero', ['build_hero']);
  grunt.registerTask('100', ['build_full_countdown']);
  grunt.registerTask('latest', ['build_latest']);
  grunt.registerTask('countdown', ['build_previous', 'build_hero', 'build_full_countdown', 'build_latest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

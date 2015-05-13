/*
 * grunt-build-countdown
 * https://github.com/cheee6y/grunt-build-countdown
 *
 * Copyright (c) 2015 Emma Chee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('build_full_countdown', 'A grunt plugin for building directories and files from a json file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var countdown_outter = grunt.file.read(file.countdown[0]);
      var countdown_inner = grunt.file.read(file.countdown[1]);
      var jsonfile = grunt.file.readJSON(file.src);
      var inner="";
      var index = 0;
      var content = [];
      for (var i=jsonfile.length-1; i>=0; i--) {
        var content = [];
        var dest = file.dest+jsonfile[i]['position'] + '/';
        //create folders and files
        grunt.file.mkdir(dest);
        grunt.log.writeln('File "' + dest + '" created.');

        //Generate countdown tracks, so do not include the current index.
        // console.log(index);
        for (var item = 0; item <= index; item++){
          var json_index = (jsonfile.length-1)-item;
          content.push(jsonfile[json_index]);
        }
        var thing = buildcountdown(content);
        writecountdown(thing);
        index++;
      }

      function buildcountdown(content){
        var string="";
        content.forEach(function(entry){
          string = formatted(entry) + string;
        });
        string = countdown_outter.replace('[@1-100-item]', string);
        return string;
      }
      function formatted(entry){
        var formatted = countdown_inner;
        formatted = formatted.replace('[@position1]', entry.position);
        formatted = formatted.replace('[@position2]', entry.position);
        formatted = formatted.replace('[@key1]', entry.key);
        formatted = formatted.replace('[@key2]', entry.key);
        formatted = formatted.replace('[@key3]', entry.key);
        formatted = formatted.replace('[@key4]', entry.key);
        formatted = formatted.replace('[@movement]', entry.movement);
        formatted = formatted.replace('[@work]', entry.work);
        formatted = formatted.replace('[@composer]', entry.composer);
        formatted = formatted.replace('[@movement]', entry.movement);
        return formatted;
      }
      function writecountdown(thing){
        grunt.file.write(dest+'/'+'1-100.htm', thing);
      }
    });
  });
};

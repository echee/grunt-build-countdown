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

  grunt.registerMultiTask('build_previous', 'A grunt plugin for building directories and files from a json file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var previous_outter = grunt.file.read(file.previous[0]);
      var previous_inner = grunt.file.read(file.previous[1]);
      var jsonfile = grunt.file.readJSON(file.src);
      var inner="";
      var index = 0;
      var content = [];
      for (var i=jsonfile.length-1; i>=0; i--) {
        var content = [];
        var dest = file.dest+jsonfile[i]['position'] + '/';
        //create folders and files
        grunt.file.mkdir(dest);

        //Generate previous tracks, so do not include the current index.
        // console.log(index);
        for (var item = 0; item < index; item++){
          var json_index = (jsonfile.length-1)-item;
          content.push(jsonfile[json_index]);
        }
        var thing = buildPrevious(content);
        writePrevious(thing);
        index++;
      }

      function buildPrevious(content){
        var string="";
        content.forEach(function(entry){
          // string = previous_inner.replace('[@position]', entry.position);
          // console.log(entry.position);
          // console.log(entry.key);
          string = formatted(entry) + string;
          // inner = entry['position'];
        });
        // insert string into outter wrapper
        string = previous_outter.replace('[@previous-item]', string);
        return string;
      }
      function formatted(entry){
        var formatted = previous_inner;
        formatted = formatted.replace('[@position]', entry.position);
        formatted = formatted.replace('[@key1]', entry.key);
        formatted = formatted.replace('[@key2]', entry.key);
        formatted = formatted.replace('[@work]', entry.work);
        formatted = formatted.replace('[@composer]', entry.composer);
        formatted = formatted.replace('[@movement]', entry.movement!=""? entry.movement : "&nbsp;");
        return formatted;
      }
      function writePrevious(thing){
        grunt.file.write(dest+'/'+'previous.htm', thing);
        grunt.log.writeln('File "' + dest + 'previous.htm" created.');
      }
    });
  });
};

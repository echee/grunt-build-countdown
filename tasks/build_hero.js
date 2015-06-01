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

  grunt.registerMultiTask('build_hero', 'A grunt plugin for building directories and files from a json file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      var hero_content = grunt.file.read(file.hero[0]);
      var jsonfile = grunt.file.readJSON(file.src);
      var inner="";
      for (var i=jsonfile.length-1; i>=0; i--) {
        var content = [];
        var dest = file.dest+jsonfile[i]['position'] + '/';
        grunt.file.mkdir(dest);
        content = buildPrevious(i);
        writePrevious(content);
      }
      function writePrevious(content){
        grunt.file.write(dest+'/'+'hero.htm', content);
        grunt.log.writeln('File "' + dest + 'hero.htm" created.');
      }
      function buildPrevious(index){
          inner = hero_content.replace('[@position1]', jsonfile[index]['position']);
          inner = inner.replace('[@position2]', jsonfile[index]['position']);
          inner = inner.replace('[@key1]', jsonfile[index]['key']);
          inner = inner.replace('[@key2]', jsonfile[index]['key']);
          inner = inner.replace('[@key3]', jsonfile[index]['key']);
          inner = inner.replace('[@key4]', jsonfile[index]['key']);
          inner = inner.replace('[@composer]', jsonfile[index]['composer']);
          inner = inner.replace('[@work]', jsonfile[index]['work']);
          inner = inner.replace('[@movement]', jsonfile[index]['movement']);
          content = content+inner;
          return content;
      }
    });
  });

};

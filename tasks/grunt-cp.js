/**
 * grunt-wrap
 * https://github.com/chrissrogers/grunt-wrap
 *
 * Copyright (c) 2012 Christopher Rogers
 * Licensed under the MIT license.
 */

// wrap: {
//   modules: {
//     src: ['assets/*.js'],
//     dest: 'dist/',
//     wrapper: ['define(function (require, exports, module) {\n', '\n});']
//   }
// }

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('wrap', 'Wrap files.', function () {
    var files = grunt.file.expandFiles(this.file.src),
        path = require('path'),
        task = this,
        src;
    // Concat specified files.
    
    if (files) {
      files.map(function (filepath) {
        src = grunt.helper('wrap', filepath, {wrapper: task.data.wrapper, excludeBase: task.data.excludeBase});
        grunt.file.write(path.join(task.file.dest, filepath.replace(task.data.excludeBase, '')), src);
      });
    }

    // Fail task if errors were logged.
    if (this.errorCount) return false;

    // Otherwise, print a success message.
    grunt.log.writeln('Wrapped files created in "' + this.file.dest + '".');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('wrap', function (filepath, options) {

    options = grunt.utils._.defaults(options || {}, {
      wrapper: ['', ''],
      excludeBase: ''
    });

    //console.log("Exclude me: " + options.excludeBase);
    definepath = filepath.replace(options.excludeBase, '').replace(/\.\w+$/, '');

    if (typeof(options.wrapper) === 'function') {
      return options.wrapper(definepath, grunt.task.directive(filepath, grunt.file.read));
    } else {
      return options.wrapper[0] + grunt.task.directive(filepath, grunt.file.read) + options.wrapper[1];
    }
    
  });

};

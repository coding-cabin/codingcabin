module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      files: "scss/**/*.scss",
      tasks: ["sass"],
      options: {
        // Start a live reload server on the default port 35729
        livereload: true,
      },
    },
    sass: {
      dev: {
        files: {
          "css/main.min.css": "css/scss/main.scss",
        },
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html"],
        },
        options: {
          watchTask: true,
          server: ".",
        },
      },
    },
  });

  //   grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");

  grunt.registerTask("default", ["browserSync", "watch", "sass"]);
};

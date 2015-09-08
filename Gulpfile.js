
var gulp = require('gulp');

gulp.task('compile', function () {
  // compile using babel
});

gulp.task('default', function() {
  gulp.watch('src/**/*.js', ['compile']);
});

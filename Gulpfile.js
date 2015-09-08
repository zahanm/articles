
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      whitelist: [
        // only things not supported by io.js
        'strict',
        'es6.arrowFunctions',
        'es6.modules',
        'es6.destructuring',
      ]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['babel']);
});

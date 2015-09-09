
'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

const childProcess = require('child_process')
const spawn = childProcess.spawn;
const execFileSync = childProcess.execFileSync;

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
    .pipe(gulp.dest('dist/'));
});

let server = null;
gulp.task('server', ['babel'], function () {
  if (server !== null) {
    server.kill();
  }
  server = spawn('node', ['dist/index.js'], { stdio: 'inherit' });
});

gulp.task('drop', function () {
  execFileSync(
    'mongo',
    ['articles', '--eval', 'db.users.drop()'],
    { stdio: 'inherit' }
  );
});

gulp.task('default', ['server'], function() {
  gulp.watch('src/**/*.js', ['babel', 'server']);
});

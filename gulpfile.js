'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

gulp.task('js', () => {
  gulp.src('js/app.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['js']);

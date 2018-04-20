var gulp = require('gulp'),
    uglify = require('gulp-uglify');
    uglifycss = require('gulp-cssmin');

gulp.task('minifyjs', function () {
    gulp.src('js/registration.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('minifycss', function () {
    gulp.src('css/style.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('build/css'));
});
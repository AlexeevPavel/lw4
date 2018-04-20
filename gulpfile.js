var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('js/registration.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});
var gulp = require('gulp'),
  uglify = require('gulp-uglify');
  uglifycss = require('gulp-cssmin');
  copy = require('gulp-contrib-copy'); 

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

gulp.task('copyhtml', function() {
  gulp.src('index.html')
    .pipe(copy())
    .pipe(gulp.dest('build'));
});

gulp.task('copyimg', function() {
  gulp.src('img/background.jpg')
    .pipe(copy())
    .pipe(gulp.dest('build/img'));
});

gulp.task('minifyall', function () {
  gulp.src('js/registration.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
  gulp.src('css/style.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('build/css'))
  gulp.src('index.html')
    .pipe(copy())
    .pipe(gulp.dest('build'));
  gulp.src('img/background.jpg')
    .pipe(copy())
    .pipe(gulp.dest('build/img'));
}); 
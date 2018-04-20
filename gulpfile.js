var gulp = require('gulp'),
  uglify = require('gulp-uglify');
  uglifycss = require('gulp-cssmin');
  copy = require('gulp-contrib-copy'); 
  rename = require('gulp=rename');
  browserSync = require('browser-sync');
  reload = browserSync.reload;
  path = {
      html:['index.html'],
      css:['css/style.css'],
      script:['js/registration.js']
  };

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
    .pipe(rename({
      basename: "registration",
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(gulp.dest('build/js'))
  gulp.src('css/style.css')
    .pipe(uglifycss())
    .pipe(rename({
        basename: "style",
        suffix: ".min",
        extname: ".css"
    }))
    .pipe(gulp.dest('build/css'))
  gulp.src('index.html')
    .pipe(copy())
    .pipe(gulp.dest('build'));
  gulp.src('img/background.jpg')
    .pipe(copy())
    .pipe(gulp.dest('build/img'));
}); 
var gulp = require('gulp');
  uglify = require('gulp-uglify');
  uglifycss = require('gulp-cssmin');
  rename = require('gulp-rename');
  browserSync = require('browser-sync');
  inject = require('gulp-inject');
  watcher = require('gulp-watch');
  reload = browserSync.reload;
  path = {
    build: {
      html: 'build/',
      css: 'build/css/',
      js: 'build/js/',
      img: 'build/img/'
    },
    src: {
      html: 'src/*.html',
      js: 'src/js/registration.js',
      jquery: 'src/js/jquery.min.js',
      css: 'src/css/style.css',
      img: 'src/img/*.*'
    }
  };

gulp.task('minifyjs', function () {
  gulp.src(path.src.js)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('minifycss', function () {
  gulp.src(path.src.css)
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('html', function() {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
  .on('end', function () {
    gulp.src(path.build.html + 'index.html')
    .pipe(inject(gulp.src('./build/js/*.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src('./build/css/style.min.css', {read: false}), {relative: true}))
    .pipe(gulp.dest(path.build.html));
  })
  .pipe(reload({stream: true}));
});

gulp.task('copyimg', function() {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});

gulp.task('copyjquery', function() {
  gulp.src(path.src.jquery)
    .pipe(gulp.dest(path.build.js))
});

gulp.task('build', ['html','minifyjs','copyjquery','minifycss','copyimg']); 
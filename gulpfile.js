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
    },
    watch: {
      html: 'src/**/*.html',
      js: 'src/js/**/*.js',
      style: 'src/css/**/*.css',
      img: 'src/img/**/*.*'
    }
  };

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8080,
  logPrefix: "MrHunfer"
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

gulp.task('watch', function () {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
})

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('dev', ['build', 'webserver', 'watch']);

gulp.task('default', ['dev']);
var gulp = require('gulp'),
  uglify = require('gulp-uglify');
  uglifycss = require('gulp-cssmin');
  copy = require('gulp-contrib-copy'); 
  rename = require('gulp-rename');
  browserSync = require('browser-sync');
  inject = require('gulp-inject');
  watcher = require('gulp-watch')
  reload = browserSync.reload;
  path = {
      html:['index.html'],
      css:['css/style.css'],
      js:['js/registration.js']
  };
  
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('css', function(){
  gulp.src(paths.css)
  .pipe(reload({stream:true}));
});

gulp.task('js', function(){
  gulp.src(paths.js)
  .pipe(reload({stream:true}));
});

gulp.task('minifyjs', function () {
  gulp.src('js/registration.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'));
});

gulp.task('minifycss', function () {
  gulp.src('css/style.css')
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
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

gulp.task('copyjquery', function() {
  gulp.src('js/jquery.min.js')
    .pipe(copy())
    .pipe(gulp.dest('build/js'));
});

gulp.task('inj',function () {
  var target = gulp.src('./build/index.html')
  var sources = gulp.src(['./build/**/*.js', './build/**/*.css'], {read:false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./build'));
})

gulp.task('build', ['minifyjs','minifycss','copyimg','copyhtml','copyjquery','inj']); 
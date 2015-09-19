var gulp = require('gulp')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')

var livereload = require('gulp-livereload')

//CSS
var nib = require('nib')
var stylus = require('gulp-stylus')
var concat = require('gulp-concat-css')
var minify = require('gulp-minify-css')

//JS
var uglify=require('gulp-uglify');

//JADE
var jade = require('gulp-jade')


gulp.task('js', function() {
  return gulp.src("lib/app.js")
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))// en dónde va a estar el archivo destino
	.pipe(livereload())
});


gulp.task('styl', function() {
  return gulp.src('./lib/app.styl') // entry point de styl
    .pipe(stylus({ 
      use: nib(),
      'include css': true
    })) //inicializo stylus con nib como plugin  
    .pipe(concat('app.css'))
    //.pipe(minify())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload())
})

gulp.task('jade-components', function () {
  return gulp.src('./lib/index.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./public'))
  .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen()
  gulp.watch('./lib/**/**/*.styl', ['styl'])
  gulp.watch('./lib/**/**/*.css', ['styl'])
  gulp.watch('./lib/**/**/*.jade', ['jade-components'])
  gulp.watch('./lib/**/**/*.js', ['js'])
})


gulp.task('default', ['styl','jade-components', 'js', 'watch']) 
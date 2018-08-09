var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('assets/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
      .pipe(sass())
      .pipe(gulp.dest('assets/css'))
  })

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['assets/js/_src/main.js'],
    cache: {},
    packageCache: {}
}))
.transform('babelify', {
    presets: ['es2015'],
    extensions: ['.js']
})

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("assets/js/dist"));
}

gulp.task('default', function () {
    return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js/dist'));
});

gulp.task('watch', function() {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
})

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
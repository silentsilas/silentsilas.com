var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");

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
        .pipe(gulp.dest("assets/js/dist"));
}

gulp.task('default', function () {
    return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js/dist'));
});

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
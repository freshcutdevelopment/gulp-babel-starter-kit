var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create(); //creates the browser-sync instance

gulp.task("js", function(){
   return gulp.src('src/**/*.js')
          .pipe(sourcemaps.init())
          .pipe(babel())
          .pipe(concat('app.js'))
          .pipe(sourcemaps.write("."))
          .pipe(gulp.dest("dist"));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('html-watch', ['copy-index-html'], browserSync.reload);

gulp.task('copy-index-html', function(){
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js','copy-index-html'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/**/*.js", ['js-watch']);
    gulp.watch("src/**/*.html", ['html-watch']);
});
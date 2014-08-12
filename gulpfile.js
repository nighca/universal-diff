var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    dist: 'dist',
    scripts: ['lib/head.js', 'lib/myers-compare.js', 'lib/merge.js', 'lib/tail.js']
};

gulp.task('clean', function(cb) {
    del([paths.dist], cb);
});

gulp.task('build-dev', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(concat('diff.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(concat('diff.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['build-dev', 'build']);
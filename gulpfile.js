var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var del = require('del');

var info = require('./package.json');

var head = '/*! diff-merge v' + info.version + ' | ' + info.author.name + '(' + info.author.email + ') | Apache License(2.0) */\n';

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
        .pipe(replace(/\/\*[\s\S]*?\*\/\n/g, ''))
        .pipe(replace(/^/g, head))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(concat('diff.min.js'))
        .pipe(uglify())
        .pipe(replace(/^/g, head))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['build-dev', 'build']);
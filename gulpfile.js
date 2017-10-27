var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('buildcss', function() {
    return gulp.src('source/**/*.css')
        .pipe(concat('static/stylesheets/build.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('build'));
});

gulp.task('buildjs', function() {
    return gulp.src('source/**/*.js')
        .pipe(concat('static/javascripts/build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('buildhtml', function() {
    return gulp.src('source/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('build'));
});

gulp.task('buildimages', function() {
    return gulp.src('source/**/*.@(jpg|png)')
        .pipe(imagemin())
        .pipe(gulp.dest('build'));
});

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        ['buildhtml', 'buildimages'],
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('source/**/*.@(css|js)', ['buildhtml']);
});

gulp.task('default', ['build', 'watch']);

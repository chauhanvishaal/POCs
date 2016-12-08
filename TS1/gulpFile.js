var gulp = require('gulp');
var ts = require('gulp-typescript-compiler');
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');


var typeScriptsPath = './*.ts';

gulp.task('ts' , function () {
        return gulp.src(typeScriptsPath)
            .pipe(ts())
            .pipe(gulp.dest('./public/js'));
    });

gulp.task('transformLess-minifyCSS',function () {
    return gulp.src('./css/*.less')
        .pipe(less())
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('./public/css'));
})

gulp.task('watchTSFiles',function(event){
    return gulp.watch(typeScriptsPath,['ts']);
});
gulp.task('default', ['watchTSFiles']);

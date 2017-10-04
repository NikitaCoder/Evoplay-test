const gulp = require('gulp'),
    path = require('path'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minCss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync');

const config = {
    src: '_src',
    jade: '_src/jade',
    less: '_src/less',
    css: '_src/css',
    build: 'build'
};

gulp.task('jade', function(){
    gulp.src(config.jade + '/pages/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.build))
        .on('finish', function() {
            console.log('jade done');
        });
});

gulp.task('less', function(){
    return gulp.src(config.less + '/styles.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            includePaths: config.less
        }))
        .pipe(rename({
            basename: "styles"
        }))
        .pipe(gulp.dest(config.build+'/css/'))
        .pipe(minCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.build+'/css/'))
        .pipe(browserSync.reload({stream: true}))
        .on('finish', function() {
            console.log('less done');
        });
});

gulp.task('browser-sync', ['less', 'jade'],function(){
    browserSync({
        server: {baseDir: config.build},
        notify: true
    })
});

gulp.task('watch', function(){
    gulp.watch(config.less + '/**', ['less']);
    gulp.watch(['*jade', '**/*.jade'], ['jade']);
});

gulp.task('run', ['browser-sync', 'watch']);
'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import htmlhint from 'gulp-htmlhint';
import del from 'del';
var browserSync = require('browser-sync').create();

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/assets/js/**/*.js',
    CSS: DIR.SRC + '/assets/css',
    SASS: DIR.SRC + '/assets/sass/**/*.scss',
    HTML: DIR.SRC + '/html/*.html',
    IMAGES: DIR.SRC + '/assets/images/**/*',
    FONTS: DIR.SRC + '/assets/fonts/*'
};

const DEST = {
    JS: DIR.DEST + '/assets/js',
    CSS: DIR.DEST + '/assets/css',
    HTML: DIR.DEST + '/html',
    IMAGES: DIR.DEST + '/assets/images',
    FONTS: DIR.DEST + '/assets/fonts'
};

gulp.task('js', () => {
    return gulp.src(SRC.JS)
        .pipe(uglify())
        .pipe(gulp.dest(DEST.JS))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', () => {
    return gulp.src(SRC.SASS)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 9', 'iOS >= 6', 'Android >= 4'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SRC.CSS))
        .pipe(gulp.dest(DEST.CSS))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('index', () => {
    return gulp.src(DIR.SRC + "/index.html")
        .pipe(gulp.dest(DIR.DEST))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', () => {
    return gulp.src(SRC.HTML)
        .pipe(htmlhint())
        .pipe(gulp.dest(DEST.HTML))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', () => {
    return gulp.src(SRC.IMAGES)
        .pipe(imagemin())
        .pipe(gulp.dest(DEST.IMAGES))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', () => {
    return gulp.src(SRC.FONTS)
        .pipe(gulp.dest(DEST.FONTS))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', () => {
    return del.sync([DIR.DEST]);
});

gulp.task('watch', () => {
    gulp.watch(SRC.JS, ['js']);
    gulp.watch(SRC.SASS, ['sass']);
    gulp.watch(SRC.HTML, ['html']);
    gulp.watch(SRC.IMAGES, ['images']);
    gulp.watch(DIR.SRC+'/index.html', ['index']);
});

gulp.task('server', () => {
    return browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', ['clean', 'js', 'sass', 'index', 'html', 'images', 'fonts', 'watch', 'server'], () => {
    gutil.log('Gulp is running');
});
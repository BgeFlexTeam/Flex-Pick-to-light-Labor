var gulp = require('gulp');
var tsc = require('gulp-typescript');
var watch = require('gulp-watch');
var install = require("gulp-install");
var javascriptObfuscator = require('gulp-javascript-obfuscator');

//Copy dependecies to ''wwwroot/lib/'
gulp.task("copy", function () {
    return gulp
        .src([
            // 'node_modules/**//redux/dist/redux.js',
            // 'node_modules/**//polymer-2-decorators/*.js'
            'bower_components/**/*',
        ])
        .pipe(gulp.dest('wwwroot/lib/./'));
});

//Transpile 'src/*.ts' files
gulp.task("ts", function () {
    var tsProject = tsc.createProject('tsconfig.json');

    return tsProject
        .src()
        .pipe(tsProject())
        .pipe(gulp.dest('wwwroot/js'));

});

//Watch and transpile 'src/*.ts' files
gulp.task("watch-ts", function () {
    return watch('wwwroot/src/*.ts', function () {
        gulp.start('ts');
    });
});

gulp.task("ob", function () {
    return gulp.src("wwwroot/js/*.js")
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest('wwwroot/js'));
});

//Install Npm modules
gulp.task("modules", function () {
    return gulp
        .src(['./package.json'])
        .pipe(install());
});

//Requires 'npm install' for local gulp :)
gulp.task("install", ["modules", "copy", "ts"]);

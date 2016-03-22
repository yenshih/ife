var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cleancss = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    pngquant = require('imagemin-pngquant'),
    cache = require("gulp-cache"),
    clean = require("gulp-clean"),
    livereload = require("gulp-livereload");

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(livereload());
});

gulp.task("styles", function() {
    return sass("src/styles/*.scss", {style: "compressed"})
        .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(cleancss())
        .pipe(concat("main.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/styles"))
        .pipe(livereload());
});

gulp.task("images", function() {
    return gulp.src("src/images/*.{png,jpg,gif,ico}")
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest("dist/images"))
        .pipe(livereload());
});

gulp.task("clean", function() {
    return gulp.src(["dist/", "dist/styles", "dist/images"], { read: false })
        .pipe(clean());
});

gulp.task("default", ["clean"], function() {
    gulp.start("html", "styles", "images");
});

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/styles/*.scss", ["styles"]);
    gulp.watch("src/images/*.{png,jpg,gif,ico}", ["images"]);
});
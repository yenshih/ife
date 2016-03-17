var gulp = require("gulp"), 
    sass = require("gulp-ruby-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    cleancss = require("gulp-clean-css"),
    clean = require("gulp-clean"),
    livereload = require("gulp-livereload"),
    rename = require("gulp-rename");

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
});

gulp.task("styles", function() { 
    return sass("src/styles/*.scss", {style: "compressed"})
        .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(cleancss())
        .pipe(concat("main.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/styles"))
});

gulp.task("clean", function() { 
    return gulp.src(["dist/", "dist/styles"], { read: false })
        .pipe(clean());
});

gulp.task("default", ["clean"], function() { 
    gulp.start("html", "styles");
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/styles/*.scss", ["styles"]);
    livereload.listen();
    gulp.watch(["dist/*"]).on("change", livereload.changed);
});
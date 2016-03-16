var gulp = require("gulp"), 
    sass = require("gulp-ruby-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    minifycss = require("gulp-minify-css"),
    imagemin = require("gulp-imagemin"),
    cache = require("gulp-cache"),
    clean = require("gulp-clean"),
    livereload = require("gulp-livereload"),
    rename = require("gulp-rename");

gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
})

gulp.task("styles", function() { 
    return sass("src/styles/**/*.scss", {style: "compressed"})
        .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(concat("main.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifycss())
        .pipe(gulp.dest("dist/styles"))
});

gulp.task("images", function() { 
    return gulp.src("src/images/**/*")
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest("dist/images"))
});

gulp.task("clean", function() { 
    return gulp.src(["dist/styles", "dist/images"], {read: false})
        .pipe(clean());
});

gulp.task("default", ["clean"], function() { 
    gulp.start("html", "styles", "images");
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/styles/**/*.scss", ["styles"]);
    gulp.watch("src/images/**/*", ["images"]);
    livereload.listen();
    gulp.watch(["dist/*"]).on("change", livereload.changed);
});
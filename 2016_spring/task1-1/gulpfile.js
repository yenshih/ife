var gulp = require("gulp"), 
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
});

gulp.task("images", function() { 
    return gulp.src("src/images/*.{png,jpg,gif,ico}")
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }, { cleanupIDs: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest("dist/images"))
});

gulp.task("clean", function() { 
    return gulp.src(["dist/", "dist/images"], { read: false })
        .pipe(clean());
});

gulp.task("default", ["clean"], function() { 
    gulp.start("html", "images");
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/images/*.{png,jpg,gif,ico}", ["images"]);
    livereload.listen();
    gulp.watch(["dist/*"]).on("change", livereload.changed);
});
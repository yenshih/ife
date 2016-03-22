import gulp from "gulp";
import clean from "gulp-clean";
import htmlmin from "gulp-htmlmin";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import concat from "gulp-concat";
import rename from "gulp-rename";
import webpack from "webpack-stream";
import config from "./webpack.config.babel";
import uglify from "gulp-uglify";
import livereload from "gulp-livereload";

gulp.task("html", () =>
    gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(livereload())
);

gulp.task("styles", () =>
    gulp.src("src/styles/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(cleancss())
        .pipe(concat("main.css"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/styles"))
        .pipe(livereload())
);

gulp.task("scripts", () =>
    gulp.src("src/scripts/*.js")
        .pipe(webpack(config))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/scripts"))
        .pipe(livereload())
);

gulp.task("clean", () =>
    gulp.src(["dist/", "dist/styles", "dist/scripts"], { read: false })
        .pipe(clean())
);

gulp.task("default", ["clean"], () => {
    gulp.start("html", "styles", "scripts");
});

gulp.task("watch", () => {
    livereload.listen();
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/styles/*.scss", ["styles"]);
    gulp.watch("src/scripts/*.js", ["scripts"]);
});
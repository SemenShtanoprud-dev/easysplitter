import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as sass from "sass";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import browserSyncPackage from "browser-sync";
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import gulpIf from "gulp-if";
import { deleteAsync } from "del";

const { src, dest, watch, series, parallel } = gulp;
const scss = gulpSass(sass);
const browserSync = browserSyncPackage.create();

const isProd = process.env.NODE_ENV === "production";

const paths = {
  html: {
    src: "src/html/*.html",
    watch: "src/html/**/*.html",
    dest: "dist/",
  },
  styles: {
    src: "src/scss/style.scss",
    watch: "src/scss/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    watch: "src/js/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: "src/images/**/*.{jpg,jpeg,png,svg,gif,webp,avif}",
    dest: "dist/images/",
  },
  fonts: {
    src: "src/fonts/**/*",
    dest: "dist/fonts/",
  },
};

export async function clean() {
  await deleteAsync(["dist"]);
}

export function html() {
  return src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(
      gulpIf(
        isProd,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        }),
      ),
    )
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

export function styles() {
  return src(paths.styles.src)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(scss().on("error", scss.logError))
    .pipe(postcss([autoprefixer(), ...(isProd ? [cssnano()] : [])]))
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src(paths.scripts.src)
    .pipe(gulpIf(isProd, terser()))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

export function images() {
  return src("src/images/**/*", { encoding: false }).pipe(dest("dist/images/"));
}

export function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

export function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    notify: false,
    open: true,
  });

  watch(paths.html.watch, html);
  watch(paths.styles.watch, styles);
  watch(paths.scripts.watch, scripts);
  watch(paths.images.src, images).on("change", browserSync.reload);
  watch(paths.fonts.src, fonts).on("change", browserSync.reload);
}

const buildTasks = parallel(html, styles, scripts, images, fonts);

export const build = series(
  async function setProd(done) {
    process.env.NODE_ENV = "production";
    done();
  },
  clean,
  buildTasks,
);

export default series(clean, buildTasks, serve);

const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const fileInclude = require('gulp-file-include');
const bs = require('browser-sync').create();
const htmlMinify = require('html-minifier');
const autoprefixer = require('autoprefixer');
const cssnanoPlugin = require('cssnano');
const mediaquery = require('postcss-combine-media-query');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const concatCss = require('gulp-concat-css');
const GulpPostCss = require('gulp-postcss');
const webpack = require('webpack-stream');
const isBuild = (process.env.npm_lifecycle_event === 'build');

function serve() {
  return bs.init({
    server: {
      baseDir: './dist/'
    }
  });
}

function clean() {
  return del('dist');
}

function html() {
  const options = {
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    collapseWhitespace: true,
      minifyCSS: true,
      keepClosingSlash: true
  };

  return gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .on('data', file => {
      const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
      return file.contents = buferFile;
    })
    .pipe(gulp.dest('./dist/'))
    .pipe(bs.reload({ stream: true }));
};

function js() {
  return gulp.src('./src/index.js')
    .pipe(plumber())
    .pipe(webpack({
      output: {
        filename: 'index.js'
      },
      mode: isBuild ? 'production' : 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(bs.reload({ stream: true }));
}

function scss() {
  const plugins = [
    autoprefixer(),
    mediaquery(),
    cssnanoPlugin()
  ];

  return gulp.src('./src/index.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(GulpPostCss(plugins))
    .pipe(gulp.dest('./dist/'))
    .pipe(bs.reload({stream: true}));
}

function img() {
  return gulp.src('./src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}', { encoding: false })
    .pipe(gulp.dest('./dist/images/'))
    .pipe(bs.reload({ stream: true }));
}

function fonts() {
  return gulp.src('./src/fonts/**/*.{woff,woff2,ttf}', { encoding: false })
    .pipe(gulp.dest('./dist/fonts/'))
    .pipe(bs.reload({ stream: true }));
}

function watchFiles() {
  gulp.watch(['./src/**/*.html'], html);
  gulp.watch(['./src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], img);
  gulp.watch(['./src/fonts/**/*.{woff,woff2,ttf}'], fonts);
  gulp.watch(['./src/**/*.scss'], scss);
  gulp.watch(['./src/**/*.js'], js);
}

const build = gulp.series( clean, gulp.parallel(html, js, scss, img, fonts));

const dev = gulp.series(build, gulp.parallel(serve, watchFiles));

module.exports = {
  clean,
  build,
  dev
}
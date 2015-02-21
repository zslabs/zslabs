// Load plugins
var gulp         = require("gulp"),
    svgSprite    = require("gulp-svg-sprite"),
    replace      = require("gulp-replace"),
    imagemin     = require("gulp-imagemin"),
    pngcrush     = require('imagemin-pngcrush'),
    csso         = require("gulp-csso"),
    less         = require("gulp-less"),
    coffee       = require("gulp-coffee"),
    coffeelint   = require("gulp-coffeelint"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify       = require("gulp-uglify"),
    notify       = require("gulp-notify"),
    changed      = require("gulp-changed"),
    concat       = require("gulp-concat"),
    filesize     = require("gulp-size"),
    duration     = require("gulp-duration"),
    pixrem       = require("gulp-pixrem"),
    sourcemaps   = require("gulp-sourcemaps"),
    plumber      = require("gulp-plumber"),
    merge        = require("merge-stream"),
    filter       = require("gulp-filter"),
    browserSync  = require("browser-sync"),
    reload       = browserSync.reload,
    cp           = require("child_process");

var paths =  {
      "scripts": {
        "src": "assets/js/src/**/*.coffee",
        "build": "assets/js/build/",
        "vendor": "!assets/js/src/vendor/**/*.js"
      },
      "styles": {
        "src": "assets/css/src/**/*.less",
        "build": "assets/css/build/"
      },
      "media": {
        "src": "assets/media/src/**/*",
        "build": "assets/media/build/"
      },
      "svg": {
        "src": "assets/svg/src/*.svg",
        "build": "assets/svg/build/"
      },
      "fonts": {
        "build": "assets/fonts/"
      }
    };

// Scripts
gulp.task("scripts", function() {

  // Main
  var main = gulp.src([
      // Vendor
      "bower_components/jquery/dist/jquery.min.js",
      "bower_components/fastclick/lib/fastclick.js",
      "bower_components/svg4everybody/svg4everybody.js",
      "assets/js/src/vendor/highlight.pack.js"
    ])
    .pipe(changed(paths.scripts.build))
    .pipe(sourcemaps.init())
      .pipe(concat("dep.min.js"))
      .pipe(uglify())
    .pipe(sourcemaps.write("../sourcemaps"))
    .pipe(filesize({
      title: "Main Scripts:"
    }))
    .pipe(gulp.dest(paths.scripts.build))
    .pipe(duration("building main JS files"))
    .pipe(notify({ message: "Main scripts task complete" }));

    return main;
});

// Coffee
gulp.task("coffee", function() {
  return gulp.src([
    "assets/js/src/_init.coffee",
    ])
    .pipe(changed(paths.scripts.build))
    .pipe(plumber())
      .pipe(coffeelint({
        "max_line_length": {
          "level": "ignore"
        }
      }))
      .pipe(coffeelint.reporter())
      .pipe(sourcemaps.init())
        .pipe(concat("app.min.coffee"))
        .pipe(coffee())
        .pipe(uglify())
      .pipe(sourcemaps.write("../sourcemaps"))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.scripts.build));
});

// Styles
gulp.task("styles", function() {
  gulp.src("assets/css/src/app.less")
    .pipe(changed(paths.styles.build))
    .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ["last 2 versions"]
      }))
      .pipe(csso())
      .pipe(pixrem("15px", {
        replace: true
      }))
    .pipe(plumber.stop())
    .pipe(filesize({
      title: "Styles:"
    }))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(reload({stream:true}))
    .pipe(duration("building styles"))
    .pipe(notify({ message: "Styles task complete" }));
});

// Media
gulp.task("media", function() {
  return gulp.src(paths.media.src)
    .pipe(changed(paths.media.build))
    .pipe(imagemin())
    .pipe(filesize({
      title: "Media File:"
    }))
    .pipe(gulp.dest(paths.media.build))
    .pipe(duration("compressing media"))
    .pipe(notify({ message: "Media task complete" }));
});

// SVG
gulp.task("svg", function () {
  return gulp.src(paths.svg.src)
    .pipe(replace("#000000", "#000001")) // This is to fix https://github.com/svg/svgo/issues/115
    .pipe(imagemin())
    .pipe(gulp.dest(paths.svg.build));
});

gulp.task("svg-sprite", function () {
  return gulp.src(paths.svg.src)
    .pipe(replace("#000000", "#000001")) // This is to fix https://github.com/svg/svgo/issues/115
    .pipe(svgSprite({
      "svg": {
        "xmlDeclaration": false,
        "doctypeDeclaration": false,
        "dimensionAttributes": false
      },
      "mode": {
        "symbol": {
            "dest": "",
            "sprite": "sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(paths.svg.build));
});

// Build Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
});

// Watch
gulp.task("watch", ['browser-sync'], function () {
  gulp.watch(paths.scripts.src, ["scripts"]);
  gulp.watch("assets/js/src/**/*.coffee", ["coffee"]);
  gulp.watch(paths.styles.src, ["styles"]);
  gulp.watch(paths.media.src, ["media"]);
  gulp.watch(paths.svg.src, ["svg", "svg-sprite"]);

  gulp.watch(["**/*.html", "_posts/*", paths.scripts.src, paths.styles.src], ["jekyll-rebuild"]);
});

// Default task
gulp.task("default", ["styles", "scripts", "coffee", "media", "svg", "svg-sprite"]);

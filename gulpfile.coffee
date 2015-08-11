# Dependencies
gulp        = require "gulp"
$           = require("gulp-load-plugins")()
browserSync = require "browser-sync"
reload      = browserSync.reload
del         = require "del"
cp          = require "child_process"

paths =
  "scripts":
    "src": "assets/js/src/**/*.js"
    "build": "assets/js/build/"
  "styles":
    "src": "assets/css/src/**/*.less"
    "build": "assets/css/build/"
  "media":
    "src": "assets/media/src/**/*"
    "build": "assets/media/build/"
  "svg":
    "src": "assets/svg/src/*.svg"
    "build": "assets/svg/build/"

# BrowserSync
gulp.task "browser-sync", ->
  browserSync.init
    server:
      baseDir: "_site"
  return

# Build Jekyll Site
gulp.task "jekyll-build", (done) ->
  browserSync.notify "Building Jekyll"
  cp.spawn("jekyll", [ "build" ], stdio: "inherit").on "close", done

# Rebuild Jekyll & do page reload
gulp.task "jekyll-rebuild", [ "jekyll-build" ], ->
  browserSync.reload()
  return

# Clean old app files
gulp.task "clean:app", (cp) ->
  del [ "assets/js/build/app*" ],  cp
  return

# App
gulp.task "app", ["clean:app"], ->
  revAll = new $.revAll(
    dontGlobal: [".map"]
    fileNameManifest: "app-manifest.json"
  )

  gulp.src([
    "bower_components/boomsvgloader/dist/js/boomsvgloader.js"
    "assets/js/src/vendor/highlight.pack.js"
    "assets/js/src/init.js"
  ])
  .pipe($.changed(paths.scripts.build))
  .pipe($.sourcemaps.init())
    .pipe($.concat("app.min.js"))
    .pipe($.uglify())
  .pipe($.sourcemaps.write("../sourcemaps"))
  .pipe($.size(
    showFiles: true
    title: 'App JS:'))
  .pipe($.duration("building app js files"))
  .pipe(revAll.revision())
  .pipe(gulp.dest(paths.scripts.build))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest("_data"))

# Clean old app files
gulp.task "clean:styles", (cp) ->
  del [ "assets/css/build/*.css" ],  cp
  return

# Styles
gulp.task "styles", [ "clean:styles" ], ->
  revAll = new $.revAll(
    dontGlobal: [".png", ".jpg", ".gif", ".eot", ".woff", "ttf", ".woff2"]
    fileNameManifest: "styles-manifest.json"
  )

  gulp.src("assets/css/src/app.less")
  .pipe($.changed(paths.styles.build))
  .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.less())
      .pipe($.autoprefixer(browsers: ['last 2 versions']))
      .pipe($.minifyCss(
        'advanced': false
      ))
    .pipe($.sourcemaps.write('../sourcemaps'))
  .pipe($.plumber.stop())
  .pipe($.duration("building style files"))
  .pipe($.size(title: "Styles:"))
  .pipe(revAll.revision())
  .pipe(gulp.dest(paths.styles.build))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest("_data"))
  .pipe(reload(stream: true))

# Media
gulp.task "media", ->
  gulp.src(paths.media.src)
  .pipe($.changed(paths.media.build))
  .pipe($.imagemin())
  .pipe($.size(
    showFiles: true
    title: 'Styles:'))
  .pipe(gulp.dest(paths.media.build))
  .pipe($.duration("compressing media"))

# SVG
gulp.task "svg", ->
  gulp.src(paths.svg.src)
  .pipe($.imagemin())
  .pipe gulp.dest(paths.svg.build)

# SVG Sprite
gulp.task "svg-sprite", ->
  gulp.src(paths.svg.src)
  .pipe($.svgSprite(
    "svg":
      "xmlDeclaration": false
      "doctypeDeclaration": false
      "dimensionAttributes": false
    "mode": "symbol":
      "dest": ""
      "sprite": "sprite.svg"))
  .pipe gulp.dest(paths.svg.build)

# Watch
gulp.task "watch", [ "browser-sync" ], ->
  gulp.watch [
    "**/*.html"
    "_posts/*"
  ], [ "jekyll-rebuild" ]

  gulp.watch paths.scripts.src, [ "app" ]
  gulp.watch paths.styles.src, [ "styles" ]
  gulp.watch paths.media.src, [ "media" ]
  gulp.watch paths.svg.src, [
    "svg"
    "svg-sprite"
  ]
  return

# Default task
gulp.task "default", [
  "app"
  "styles"
  "media"
  "svg"
  "svg-sprite"
]
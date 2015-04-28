# Dependencies
gulp        = require "gulp"
$           = require("gulp-load-plugins")()
browserSync = require "browser-sync"
reload      = browserSync.reload
del         = require "del"
cp          = require "child_process"

paths =
  "scripts":
    "src": "assets/js/src/**/*.coffee"
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

# Clean old dep files
gulp.task "clean:dep", (cp) ->
  del [ "assets/js/build/dep*" ], cp
  return

# Dependencies
gulp.task "dep", ["clean:dep"], ->
  revAll = new $.revAll(
    dontGlobal: [".map"]
    fileNameManifest: "dep-manifest.json"
  )

  gulp.src([
    "bower_components/svg4everybody/svg4everybody.js"
    "assets/js/src/vendor/highlight.pack.js"
  ])
  .pipe($.changed(paths.scripts.build))
  .pipe($.sourcemaps.init())
    .pipe($.concat("dep.min.js"))
    .pipe($.uglify())
  .pipe($.sourcemaps.write("../sourcemaps"))
  .pipe($.filesize(title: "Dependencies:"))
  .pipe($.duration("building dependency files"))
  .pipe(revAll.revision())
  .pipe(gulp.dest(paths.scripts.build))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest("_data"))
  .pipe($.notify
    message: "dep task complete"
  )

# Clean old app files
gulp.task "clean:app", (cp) ->
  del [ "assets/js/build/app*" ],  cp
  return

# Coffee
gulp.task "app", ["clean:app"], ->
  revAll = new $.revAll(
    dontGlobal: [".map"]
    fileNameManifest: "app-manifest.json"
  )

  gulp.src([ "assets/js/src/init.coffee" ])
  .pipe($.changed(paths.scripts.build))
  .pipe($.plumber())
    .pipe($.coffeelint(
      "max_line_length":
        "level": "ignore"
    ))
    .pipe($.coffeelint.reporter())
    .pipe($.sourcemaps.init())
      .pipe($.concat("app.min.coffee"))
      .pipe($.coffee())
      .pipe($.uglify())
    .pipe($.sourcemaps.write("../sourcemaps"))
  .pipe($.filesize(title: "App:"))
  .pipe($.plumber.stop())
  .pipe($.duration("building coffee files"))
  .pipe(revAll.revision())
  .pipe(gulp.dest(paths.scripts.build))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest("_data"))
  .pipe($.notify
    message: "coffee task complete"
  )

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
    .pipe($.less())
    .pipe($.autoprefixer(browsers: [ "last 2 versions" ]))
    .pipe($.csso())
  .pipe($.plumber.stop())
  .pipe($.duration("building style files"))
  .pipe($.filesize(title: "Styles:"))
  .pipe(revAll.revision())
  .pipe(gulp.dest(paths.styles.build))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest("_data"))
  .pipe(reload(stream: true))
  .pipe $.notify(
    message: "styles task complete"
  )

# Media
gulp.task "media", ->
  gulp.src(paths.media.src)
  .pipe($.changed(paths.media.build))
  .pipe($.imagemin())
  .pipe($.filesize(title: "Media:"))
  .pipe(gulp.dest(paths.media.build))
  .pipe($.duration("compressing media"))
  .pipe $.notify(
    message: "meda task complete"
  )

# SVG
gulp.task "svg", ->
  gulp.src(paths.svg.src)
  .pipe($.replace("#000000", "#000001"))
  .pipe($.imagemin())
  .pipe gulp.dest(paths.svg.build)

# SVG Sprite
gulp.task "svg-sprite", ->
  gulp.src(paths.svg.src)
  .pipe($.replace("#000000", "#000001"))
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
  "dep"
  "app"
  "styles"
  "media"
  "svg"
  "svg-sprite"
]
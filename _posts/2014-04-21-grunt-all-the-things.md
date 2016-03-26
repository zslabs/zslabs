---
layout: article
title: Grunt All The Things
permalink: articles/grunt-all-the-things
---

As I mentioned in my [previous article](/articles/basey) about Basey; a WordPress boilerplate theme I created, I use several modern dev tools to tackle handling some of the magic and more monotonous tasks that go into building a website. One such tool, is called [GruntJS](http://gruntjs.com).

Grunt is a JavaScript task-runner, which can do everything from finding/replacing strings and placing copyright banners on compiled files, to running deployment tasks and rsyncing into a Vagrant instanse; pretty powerful stuff. What I thought I'd do is run through some of the Grunt plugins I use on a daily basis and why you should think about doing the same.

**[grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)** - Copies folders/files. Seems pretty simple, but when you're updating Bower components or creating separate `/src` and `/dist` directories for your project, it's a little tidbit that just makes sense. And since you can use wildcard attributes for src items, it makes selecting exactly what you want that much easier.

    copy: {
        main: {
            files: [
                {expand: true, flatten: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'assets/js/vendor/', filter: 'isFile'}
            ]
        }
    }

**[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)** - You guessed it, combines files. Most of us might be used to creating a large `plugins.js` file and pasting numerous libararies into there, but why not keep those src files separate and combine them on during a build? It makes updating, locating and re-positioning files that much easier.

    concat: {
        ie: {
            options: {
                separator: "\n\n"
            },
            src: [
                "bower_components/selectivizr/selectivizr.js",
                "bower_components/respond/dest/respond.min.js"
            ],
            dest: "assets/js/build/ie.js"
        }
    }

**[grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)** - Validates your Javascript with the ever-so-popular [JSHint](http://www.jshint.com/). Instead of mulling over your JS to determine where you missed a semi-colon, why not have JSHint do that for you?

_Hint, use [jshint-stylish](https://github.com/sindresorhus/jshint-stylish) for better looking error reports_

    jshint: {
        src: {
            options: {
                jshintrc: ".jshintrc",
                ignores: ["assets/js/build/*.js", "assets/js/vendor/*.js"],
                reporter: require('jshint-stylish')
            },
            src: ["assets/js/src/*.js"]
        }
    }

**[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)** - Remember using an online tool like [Closure Compiler](http://closure-compiler.appspot.com/) to minify all of your JS? Yeah... let's stop that and let Grunt do that for us; with help from [UglifyJS](https://github.com/mishoo/UglifyJS).

    uglify: {
        min: {
            files: {
                "assets/js/build/ie.min.js": ["assets/js/build/ie.js"]
            }
        }
    }

**[grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)** - Know what's the greatest part about writing CSS? Figuring out which vendor prefixes you need for every single property out there! Or, you could let this plugin do it for you. [Autoprefixer](https://github.com/ai/autoprefixer) solves this for us by  polling [Can I Use](http://caniuse.com/) for accurate browser support prefix conditionals. The best part about though, is that you can very easily configure which browsers you want to support. Done. Magic. You're welcome.

    autoprefixer: {

        options: {
            browsers: ['last 2 version', 'ie 9']
        },
        dist: {
            src: 'assets/css/build/app.css',
            dest: 'assets/css/build/app.css'
        }
    }

**[grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)** - What's the fun of writing [SASS](http://sass-lang.com/) if you don't have a way to compile it quickly? This plugin sits on-top of Ruby (and the SASS gem) on your system to handle the dirty work. Yes, I'm fully aware that [libsass](https://github.com/hcatlin/libsass) is out there, but I'm not going to give up [@extend](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend)... so there.

    sass: {
        dist: {
            options: {
                style: "compressed",
                loadPath: "bower_components/foundation/scss"
            },
            files: {
                'assets/css/build/app.css': 'assets/css/src/app.scss'
            }
        }
    }

**[grunt-pixrem](https://github.com/robwierzbowski/grunt-pixrem)** - I'll go ahead and say it, I think the whole _px_ vs _em_ vs _rem_ argument is moot. Certainly there's use-cases for usability on specific setups, but with all of the different facets that make up an interactive user experience, it's something that has caused more headaches than problem solving; _px_ is straight-forward and always works, everywhere. That being said, I've developed with both and had a recent project that needed to support IE8 (sucks, ammiright?) that was using REMs throughout (with Foundation 5). This plugin fit the bill nicely. Config takes a root _px_ value and can either replace all of your current stylesheet, or create an entirely new one that is _px_ based. For many projects, I simply convert all _rem_ references to _px_.

    pixrem: {
        options: {
            rootvalue: '16px',
            replace: true
        },
        dist: {
            src: 'assets/css/build/app.css',
            dest: 'assets/css/build/app.css'
        }
    }

**[grunt-csso](https://github.com/t32k/grunt-csso)** - CSSO (CSS Optimizer) that in addition to the usual minification techniques, it can perform structural optimization of CSS files, resulting in smaller file sizes. If this library could talk, it would say, "Your bloated, non-optimized code is about to get the whack slapped out of it".

    csso: {
        compress: {
            files: {
                'assets/css/build/app.css': ['assets/css/build/app.css']
            }
        }
    }

**[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)** - Runs predefined tasks whenever watched file patterns are added, changed or deleted. Why run every single task whenever "any" file is changed? Run smaller, subsets of tasks and speed up your build-process. The great thing is that this integrates with [LiveReload](http://livereload.com/), which automatically injects style updates (or reloads the browser) when tasks are complete.

    watch: {
        options: {
            livereload: true
        },
        grunt: {
            options: {
                reload: true,
            },
            files: ['Gruntfile.js'],
        },
        markup: {
            files: ["*.php"],
        },
        scss: {
            options: {
                livereload: false,
                spawn: false
            },
            files: ["assets/css/src/*.scss"],
            tasks: ["sass", "autoprefixer", "pixrem", "csso"]
        },
        css : {
            files: ["assets/css/build/*.css"],
            tasks: []
        },
        js: {
            options: {
                spawn: false
            },
            files: ["assets/js/src/*.js"],
            tasks: ["jshint", "concat", "uglify"]
        }
    }

If this is a lot to take in, I highly suggest you check out Chris Coyier's article, [Grunt for People Who Think Things Like Grunt are Weird and Hard](http://24ways.org/2013/grunt-is-not-weird-and-hard/). It'll get you up and runnning with Grunt in no time. The snippets I pasted above aren't just to pad the character count; use 'em. They're real-world examples to get past some of the initial frustrations about setting everything up.

Grunt has a large ecosystem of plugins available, so make sure you go to [gruntjs.com/plugins](http://gruntjs.com/plugins) to check 'em out!

[Original Article](http://blog.blueion.com/2014/04/21/grunt-things/)

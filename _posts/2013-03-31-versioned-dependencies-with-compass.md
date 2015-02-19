---
layout: article
title: Versioned Dependencies with Compass
---

When [Foundation](http://foundation.zurb.com/) released version 4 of their popular CSS/JS framework, they decided to go with a "mobile-first" approach. What does this mean? As Zurb mentioned in their [release post](http://www.zurb.com/article/1173/foundation-4-is-here-the-smartest-foundat):


> ... we didn't just flip some media queries and call it a day. We went through the framework and rethought how grids should work, how components should work in a mobile-first paradigm, so we could be sure the solution we deliver in Foundation 4 is smart and sturdy.

> Now when you use Foundation, the layout you write by default will be built for a small device — something that may not even support more complex layouts or grids or media queries. While smartphones are getting bigger each day, there's an enormous group of people out there using older devices, who want to see your site. With Foundation 4 you can let them — the basic layout construct in Foundation 4 will work all the way back to feature phones.

This is a great step forward for the web. Mobile-first. How simple, yet game-changing. It's because of these massive changes that I ran into a conundrum. Foundation is served via a [Ruby Gem](http://rubygems.org/) which makes it very easy to spin-up new projects with all of the dependencies and assets needed to get going. But, when you upgrade a Gem, that new version is inherently used instead of the version that a specific project might depend on. So, for projects that weren't quite ready to make the leap (like my site at the time of this article), I was between a rock and a hard place - one meaning I couldn't play around with all that F4 has to offer and the other, meaning I had to upgrade all of my F3 projects immediately.

Enter [Bundler](http://gembundler.com/), a system tool that allows you to manage multiple Gem versions for your project. When creating a new project, you simply create a `Gemfile` with your dependencies:

    source "https://rubygems.org"
    gem "zurb-foundation", "3.2.5"
    gem "compass"

Then compile it:

    bundle exec compass create . -r zurb-foundation --using foundation

Running that command will create a `Gemfile.lock` which will set your project dependencies and make it that much easier for other members of your team (or in this case, yourself) to compile the specific Foundation Gem you need to. More on that [here](http://foundation.zurb.com/docs/sass.html#multiple-versions).

While I am beginning to love the Terminal, [Codekit](http://incident57.com/codekit/) is my go-to for local development. So after I had created my F3 project (with F4 installed), I immediately opened up Codekit, compiled and was two steps away from gorging on some Nutella, when I ran into this compile error:

    Compass was unable to compile one or more files in the project:

        error app.scss (Line 1 of _settings.scss: File to import not found or unreadable: foundation/common/ratios.
    Load paths:
        /Users/chester/Sites/f3.2.5test/sass
        /Library/Ruby/Gems/1.8/gems/compass-0.12.2/frameworks/blueprint/stylesheets
        /Library/Ruby/Gems/1.8/gems/compass-0.12.2/frameworks/compass/stylesheets
        /Library/Ruby/Gems/1.8/gems/zurb-foundation-4.0.9/scss
        Compass::SpriteImporter)
        overwrite app.css


    (This action was triggered by a change to _settings.scss)

The odd-part about this error was my F3 project was referencing F4 project files `/Library/Ruby/Gems/1.8/gems/zurb-foundation-4.0.9/scss` - something still wasn't clicking. So - after much sulking about the situation, I decided to look past Bundler on a more granular scope. Bundler was creating my projects for me, but Compass was not compiling them. Each Compass project contains a `config.rb` file - normally looking something like this:

    require 'zurb-foundation'
    # Require any additional compass plugins here.


    # Set this to the root of your project when deployed:
    http_path = "/"
    css_dir = "assets/css"
    sass_dir = "assets/sass"
    images_dir = "assets/img"
    javascripts_dir = "assets/js"

    # You can select your preferred output style here (can be overridden via the command line):
    # output_style = :expanded or :nested or :compact or :compressed
    output_style = :compressed

    # To enable relative paths to assets via compass helper functions. Uncomment:
    # relative_assets = true
    relative_assets = true

    # To disable debugging comments that display the original location of your selectors. Uncomment:
    # line_comments = false


    # If you prefer the indented syntax, you might want to regenerate this
    # project again passing --syntax sass, or you can uncomment this:
    # preferred_syntax = :sass
    # and then run:
    # sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

So after a bit of searching, I found [this little gem](http://stackoverflow.com/questions/9480533/require-specific-gem-version-in-sass-compass) (pun partially intended) which boiled down to prefixing the required gem with the specific version you need in the `config.rb` file and voila!

    gem 'zurb-foundation', '=3.2.5'
    require 'zurb-foundation'
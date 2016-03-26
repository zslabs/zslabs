---
layout: article
title: Sass tips for the wise and extremely good-looking
permalink: sass-smartypants
---

Let's face it: web development has become A LOT more involved than it used to be. Can't we all just go back to using `<table>` and `<font>` for everything? No matter how much some people may cringe at all the options available today, its those options that have made my line of work that much more enjoyable and challenging. I'm able to quickly protype and build experiences that would have taken me much longer, all while learning new technologies that push you to think differently.

One such tool is [Sass](http://sass-lang.com/). It's no suprise that I'm a fan; so much so that I feel stinted when writing vanilla CSS. As with any tool, there's ways to abuse, mis-use and completely miss-the-boat on certain features. Hopefully my tips below will help lead you to more headache free development:

### Don't use mixins unless you're passing in parameters

Take the following mixin:

    @mixin header-text() {
        font-family: "Avenir Next";
        font-weight: 300;
        line-height:1.5;
    }

    #team-list .title {
        @include header-text;
    }
    #contact .department {
        @include header-text;
    }

Compiled

    #team-list .title {
        font-family: "Avenir Next";
        font-weight: 300;
        line-height: 1.5;
    }

    #contact .department {
        font-family: "Avenir Next";
        font-weight: 300;
        line-height: 1.5;
    }

This seems fine-and-dandy, but what we're creating is duplication. A better way would be to use [placeholders](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_):

    %header-text {
        font-family:"Avenir Next";
        font-weight:300;
        line-height:1.5;
    }

    #team-list .title {
        @extend %header-text;
    }
    #contact .department {
        @extend %header-text;
    }

Compiled:

    #team-list .title, #contact .department {
        font-family: "Avenir Next";
        font-weight: 300;
        line-height: 1.5;
    }

Even if you have additional styles that differentiate each, as long as you don't have params you can pass-in that would change those “segemented styles”, then a placeholder is the way to go.

### Use f'in partials

We're using a modern dev tool here folks; gone are the days of creating a 23948923 line CSS file that becomes unwieldily to manage. Separate your styles into more focused areas and pull them all in at once during processing.

    // app.scss
    @import "_variables",
            "_global",
            "_about",
            "_blog";


### Don't use color variable names

As all things do; opinions change. One of those opinions can be colors used throughout a project. Whether its subtle variations or a complete re-work, don't put yourself in the corner with color variable names that are too specific:

    // Wrong
    $darkish-blue: #008cba;
    $red: #f04124;

    // Right
    $primary-color: #008cba;
    $alert-color: #f04124;


### Be smart when nesting

Just as we all learned back in the day, CSS selectors shouldn't look something like this:

    #team-list ul > li div > a > span {
        font-weight:bold;
    }

Our styles should be general enough to be re-used wherever possible, with the least amount of resistence for particular styles in a project. With Sass, you can nest selectors, which is a hell of a lot easier to maintain. The following could be way overdone with:

    #team-list {

        > ul {

            li {

                div {

                    > a {

                        > span {
                            font-weight:bold;
                        }
                    }
                }
            }
        }
    }


Sure, we get what the end-goal is, but you're still putting extra weight on your site to parse those styles. Be smart with your selectors.

### Don't create unecessary complexity

Now my example for this is a double-edged sword; as it does require an additional setup step; but once setup, you're done. [Compass](http://compass-style.org/) is a very popular mixin library for SASS that takes away the headache of browser prefixes for older browsers that don't support their native counterparts. For example, border-radius can be handled by doing the following:

    .button {
        @include border-radius(3px);
    }

Compiled

    .button {
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
    }

The problem here is learning (what I realize is pretty straight-forward) syntax to generate browser prefixes to save time. Now let's take out the syntax learning-curve completely — right now you're still pulling in additional browser-prefixes that aren't needed anymore. If you use a tool like [Autoprefixer](https://github.com/ai/autoprefixer) to handle this; you only need to set it up with your build tool; whether that be something like [Codekit](https://incident57.com/codekit/) or [Grunt](http://gruntjs.com/), provide it a browser support config (what browser versions you do want to support) and Autoprefixer does the rest. So now, you take out the need of writing mixins, and you can write your CSS3 attributes the exact way they are intended to be. Pretty cool in my mind.

### Conclusion

Whether it be SASS, LESS, Coffeescript, etc – there are plenty of tools out there to help you build things quicker and better; just be mindful of their pros and pitfalls.

[Original Article](http://blog.blueion.com/2014/05/20/sass-tips-wise-extremely-good-looking/)

---
layout: article
title: Modifying SVG Background Fills
permalink: svg-background-fill
---

Don't get me wrong - I love [IcoMoon](http://icomoon.io), but I've become pretty annoyed with loading up the app whenever I need to add-in a new icon, generate the .zip file, copy/paste it into my project and port over the icon mappings.

There's enough articles out there that convinced me to give SVG a shot as my primary "icon" tool; [here's a great one](http://css-tricks.com/svg-sprites-use-better-icon-fonts/). With [GulpJS](http://gulpjs.com) being my primary build-tool, I found a great package called [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites) that bundles all of my SVG files into a neat-little sprite that gives me a great start. Using "symbols" mode, I'm able to do things like:

    <svg class="icon">
        <use xlink:href="sprite.svg#list"></use>
    </svg>

right within the document; while still getting all the benefits of saving that data in cache. Using `fill: currentColor`, I'm also able to inherit any font-colors attached to the element; which automatically updates the SVG fill color as well -- awesome!

But, like most things that I dive into with too much initial optimism; I ran into a snag. Inline SVGs work great, but when specifying a specific SVG as a background, I ran into a couple of issues:

1. You can't specify `xlink:href` attributes within CSS; so I'd need to reference an individual SVG - no biggy.
1. You can't modify the fill color the same as you would an icon font (with a simple `color` attribute).

Aside from the first, which I could deal with, not being able to modify the fill color of a SVG specified as a background-image seemed like a deal-breaker to me. The use-case for this was combatting [UIkit's](http://getuikit.com) method of adding icon font unicodes as part of their CSS for JavaScript generated templates; for things like their datepicker and responsive tabs. While they've mentioned they're moving towards SVG for an upcoming version, if I wanted to get around this now, specifying a background image as an SVG gets me half-way there, but doesn't allow me to modify the color.

After several dives down the rabbit-hole with background clipping and filters, [Craig Anthony](https://twitter.com/Craig_Anthony) and I decided to think about this a bit more generally; modifying the fill attribute of the SVG itself. This is simple enough, but obviously not something I could do without having access to the SVG object and all of its properties indivdiually based on the scope of its use.

So, using the power of [LESS](http://lesscss.org), I wrote a mixin function that could do just that:

    .icon-replace-fill(@src, @fill-default, @fill-new) {
        @escape-fill-default: escape(@fill-default);
        @escape-fill-new: escape(@fill-new);
        @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
        @replace-src: replace("@{data-uri}", "@{escape-fill-default}", "@{escape-fill-new}");
        background-image:e(@replace-src);
    }

This mixin accepts three parameters:

1. `@src`: The path to your SVG file.
1. `@fill-default`: The default fill value of your referenced SVG.
1. `@fill-new`: The fill value you would like to replace it with.

Within the function, we are:

1. Escaping both the `@fill-default` and `@fill-new` values (you can write them as normal HEX values this way in your mixin call)
1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute the default fill-color with your new color.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

You can use this in your styles like the following:

    .icon-picasa__replace-fill {
        width: 40px;
        height: 40px;
        .icon-replace-fill("../../svg/build/picasa.svg", "#2A91A8", "#00FFFF");
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }

<div class="uk-flex uk-flex-center uk-text-center">
  <div class="uk-margin-right">
    <h4>Original</h4>
    <i class="icon-picasa__default"></i>
  </div>
  <div>
    <h4>With Mixin</h4>
    <i class="icon-picasa__replace-fill"></i>
  </div>
</div>

Now we have control over SVG fills when referenced as backgrounds using a technique that will work all the way back to IE9, BAM! This is for replacing a single fill.

### Update

Depending on "how" you're using SVGs, you may be working with paths that do not have fills in them. This would come into play when you're referencing an external sprite, but still want to be able to use things like `fill: currentColor` within your styles. Here's a mixin that handles just that:

    .icon-add-fill(@src, @fill-new) {
        @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
        @replace-default: escape('<path ');
        @replace-new: escape('<path fill="@{fill-new}" ');
        @replace-src: replace("@{data-uri}", @replace-default, @replace-new, "g");
        background-image: e(@replace-src);
    }

This mixin accepts two parameters:

1. `@src`: The path to your SVG file.
1. `@fill-new`: The fill value you would like to have injected into your paths.

Within the function, we are:

1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute `<path ` with `<path fill="YOUR FILL COLOR" ` with the optional `g` regex flag, which matches all cases.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

You can use this in your styles like the following:

    .icon-twitter {
        width: 40px;
        height: 40px;
        .icon-add-fill("../../svg/build/twitter.svg", "#55acee");
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }

<div class="uk-flex uk-flex-center uk-text-center">
  <div class="uk-margin-right">
    <h4>Original</h4>
    <i class="icon-twitter__default"></i>
  </div>
  <div>
    <h4>With Mixin</h4>
    <i class="icon-twitter__add-fill"></i>
  </div>
</div>

### Update 2

It's been great to hear about so many people finding value in these functions I wrote. I came across yet another use-case that I wanted to tackle; this one involving an SVG that has multiple different fills that you want to be replaced by a single value:

    .icon-fill(@src, @fill) {
      @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
      @replace-src: replace("@{data-uri}", "fill\%3D\%22\%23[\w]{3,6}\%22", escape('fill="@{fill}"'), "g");
      background-image:e(@replace-src);
    }

This mixin accepts two parameters:

1. `@src`: The path to your SVG file.
1. `@fill`: The fill value you would like to have injected into each path.

Within the function, we are:

1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute (the escaped version of) `fill="#HEX"` with `fill="#YOUR HEX"` with the optional `g` regex flag, which matches all cases.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

You can use this in your styles like the following:

    .icon-picasa__fill {
        width: 40px;
        height: 40px;
        .icon-fill("../../svg/build/picasa.svg", "#dd4b39");
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }

<div class="uk-flex uk-flex-center uk-text-center">
  <div class="uk-margin-right">
    <h4>Original</h4>
    <i class="icon-picasa__default"></i>
  </div>
  <div>
    <h4>With Mixin</h4>
    <i class="icon-picasa__fill"></i>
  </div>
</div>

The only part I'd like to clean-up is not being able to combine both `escape()` and `replace()`, so I'll continue to dig into that.

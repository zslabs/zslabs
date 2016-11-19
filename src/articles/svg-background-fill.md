---
title: Modifying SVG Background Fills
date: 2014-09-29
sprite: 'svg-background-fills'
excerpt: "SVG is just an image, right? Wrong!"
---

Don't get me wrong - I love [IcoMoon](http://icomoon.io), but I've become pretty annoyed with loading up the app whenever I need to add-in a new icon, generate the .zip file, copy/paste it into my project and port over the icon mappings.

There's enough articles out there that convinced me to give SVG a shot as my primary "icon" tool; [here's a great one](http://css-tricks.com/svg-sprites-use-better-icon-fonts/). With [GulpJS](http://gulpjs.com) being my primary build-tool, I found a great package called [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites) that bundles all of my SVG files into a neat-little sprite that gives me a great start. Using "symbols" mode, I'm able to do things like:

```markup
<svg class="icon">
  <use xlink:href="sprite.svg#list"></use>
</svg>
```

right within the document; while still getting all the benefits of saving that data in cache. Using `fill: currentColor`, I'm also able to inherit any font-colors attached to the element; which automatically updates the SVG fill color as well -- awesome!

But, like most things that I dive into with too much initial optimism; I ran into a snag. Inline SVGs work great, but when specifying a specific SVG as a background, I ran into a couple of issues:

1. You can't specify `xlink:href` attributes within CSS; so I'd need to reference an individual SVG - no biggy.
1. You can't modify the fill color the same as you would an icon font (with a simple `color` attribute).

Aside from the first, which I could deal with, not being able to modify the fill color of a SVG specified as a background-image seemed like a deal-breaker to me. Here's a few solutions to the issue.

## Less
<hr>

*Worked alongside [Craig Anthony](https://twitter.com/Craig_Anthony)*

### Replace fills

```less
/**
 * @src          The path to your SVG file
 * @fill-default The default fill value of your referenced SVG
 * @fill-new     The fill value you would like to replace it with
 */
.icon-replace-fill(@src, @fill-default, @fill-new) {
  @escape-fill-default: escape(@fill-default);
  @escape-fill-new: escape(@fill-new);
  @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
  @replace-src: replace("@{data-uri}", "@{escape-fill-default}", "@{escape-fill-new}");
  background-image:e(@replace-src);
}
```

Within the function, we are:

1. Escaping both the `@fill-default` and `@fill-new` values (you can write them as normal HEX values this way in your mixin call)
1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute the default fill-color with your new color.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

<div class="u-flex u-flexCenter u-textCenter">
  <div class="u-mr--regular">
    <h4>Original</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#picasa"></use></svg>
  </div>
  <div>
    <h4>With Mixin</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#picasa-fill"></use></svg>
  </div>
</div>

### New Fills

Depending on "how" you're using SVGs, you may be working with paths that do not have fills in them. This would come into play when you're referencing an external sprite, but still want to be able to use things like `fill: currentColor` within your styles. Here's a mixin that handles just that:

```less
/**
 * @src      The path to your SVG file
 * @fill-new The fill value you would like to have injected into your paths
 */
.icon-add-fill(@src, @fill-new) {
  @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
  @replace-default: escape('<path ');
  @replace-new: escape('<path fill="@{fill-new}" ');
  @replace-src: replace("@{data-uri}", @replace-default, @replace-new, "g");
  background-image: e(@replace-src);
}
```

Within the function, we are:

1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute `<path ` with `<path fill="YOUR FILL COLOR" ` with the optional `g` regex flag, which matches all cases.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

<div class="u-flex u-flexCenter u-textCenter">
  <div class="u-mr--regular">
    <h4>Original</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#twitter-default"></use></svg>
  </div>
  <div>
    <h4>With Mixin</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#twitter-filled"></use></svg>
  </div>
</div>

### Replacing multiple fills

This one involves an SVG that has multiple different fills that you want to be replaced by a single value:

```less
/**
 * @src  The path to your SVG file
 * @fill The fill value you would like to have injected into each path.
 */
.icon-fill(@src, @fill) {
  @data-uri: data-uri('image/svg+xml;charset=UTF-8', "@{src}");
  @replace-src: replace("@{data-uri}", "fill\%3D\%22\%23[\w]{3,6}\%22", escape('fill="@{fill}"'), "g");
  background-image:e(@replace-src);
}
```

Within the function, we are:

1. Using the [`data-uri()`](http://lesscss.org/functions/#misc-functions-data-uri) function to grab the data-uri version of your SVG; also setting the MIME type appopriately.
1. Using the [`replace()`](http://lesscss.org/functions/#string-functions-replace) function to substitute (the escaped version of) `fill="#HEX"` with `fill="#YOUR HEX"` with the optional `g` regex flag, which matches all cases.
1. Escaping the final data-uri and returning a `background-image` property with that value set.

<div class="u-flex u-flexCenter u-textCenter">
  <div class="u-mr--regular">
    <h4>Original</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#picasa"></use></svg>
  </div>
  <div>
    <h4>With Mixin</h4>
    <svg class="Icon Icon--xlarge"><use xlink:href="#picasa-filled"></use></svg>
  </div>
</div>

## PostCSS
<hr>

#### Fragments

Don't worry, I didn't forget about PostCSS. Well on it's way to being many developer's build-tool of choice with it's vast array of plugins, I personally use it in conjunction with Sass. So how would we go about taking advantage of modifying inline SVGs with it? The [postcss-svg-fragments](https://github.com/jonathantneal/postcss-svg-fragments) does this for us in a more "native-looking" syntax that's quite easy to bundle alongside your build-tool of choice.

Once installed, you can simply reference the sprite plus the symbol ID alongside any fill or stroke attributes.

```scss

// before
.icon {
  background-image: url(store.svg#pencil);
  fill: red;
  stroke: black;
}

// after
.icon {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg fill='red' stroke='black' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M432 0c44.182 0 80 35.817 80 80 0 18.01-5.955 34.629-16 48l-32 32-112-112 32-32c13.371-10.045 29.989-16 48-16zm-400 368l-32 144 144-32 296-296-112-112-296 296zm325.789-186.211l-224 224-27.578-27.578 224-224 27.578 27.578z'/%3E %3C/svg%3E");
  fill: red;
  stroke: black;
}
```

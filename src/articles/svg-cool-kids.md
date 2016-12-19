---
title: Reference SVGs Like the Cool Kids
date: 2014-10-14
excerpt: "Let's cleanup that markup"
---

As mentioned in my [SVG background fill article](/articles/svg-background-fill), I use [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites) to build my icon sets. This makes it incredibly simple to access specific symbols like so:

```markup
<svg class="icon">
  <use xlink:href="sprite.svg#facebook"></use>
</svg>
```

One part that I missed about this particular syntax was the simplicity that good ole icon fonts provided when referenced in the DOM:

```markup
<i class="icon-facebook"></i>
```

Simple, descriptive and easy to write. Another benefit icon fonts have in this regard is the lack of referencing an external sprite file; which is done in the first example for caching purposes. Now this can be pretty easily overcome if you're using a server-side language, like PHP - by writing a simple function:

```php
function svg_icon($icon) {
  return '<svg class="icon">
            <use xlink:href="/path/to/sprite.svg#' . $icon . '"></use>
          </svg>';
}

echo svg_icon('facebook');
```

My use-case was handling a sprite file generated within a WordPress environment that has many child themes; thus many different paths to different sprite files based on the respective theme. This normally would have been as easy as substituting the path to the active theme, like so:

```php
function svg_icon($icon) {
  return '<svg class="icon">
            <use xlink:href="' . get_stylesheet_directory_uri() . '/assets/svg/build/sprite.svg#' . $icon . '"></use>
          </svg>';
}

echo svg_icon('facebook');
```

But, I was also using [Handlebars](http://handlebarsjs.com/), a JavaScript templating engine; and did not want to pass-down template paths to each and every view. I'd also lose the ability to write a reusable function this way as well. It was obvious that a reusable server-side function wasn't the way to go.

Remember how intuitive it is to write a reference to an icon font? This was my ultimate end-goal, so that's what I ended up writing; only this time, as a client-side function:

```js
// https://cdn.polyfill.io/v2/polyfill.min.js?Element.prototype.replaceWith for `replaceWith` polyfill

/**
 * Loop over DOM nodes
 * @param  {array}   array
 * @param  {function} callback
 * @param  {scope}   scope
 * @return {void}
 */
function forEach(array, callback, scope) {
  for (let i = 0, length = array.length; i < length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
}

// Store path to sprite file
const templatePath = '/assets/svg/build/sprite.svg';
const $icons = document.querySelectorAll('[data-bt-icon]') ;

forEach($icons, (index, value) => {
  const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

  // Copy over classes
  $svg.setAttribute('class', value.classList);

  // Create `use` reference
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `${templatePath}#${value.getAttribute('data-bt-icon')}`
  );
  // https://cdn.polyfill.io/v2/polyfill.min.js?Element.prototype.replaceWith for `replaceWith` polyfill


  // Append `use` element to `svg`
  $svg.appendChild(use);

  // Replace element with `svg`
  value.replaceWith($svg);
});
```

I'm able to now write my SVG icons like so:

```markup
<i class="bt-icon" data-bt-icon="facebook"></i>
```

The above translates this to:

```markup
<svg class="bt-icon">
  <use xlink:href="/assets/svg/build/sprite.svg#facebook"></use>
</svg>
```

Now we have the power of SVG sprites with the DOM simplicity of icon fonts.

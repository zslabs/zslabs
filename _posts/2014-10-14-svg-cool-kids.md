---
layout: article
title: Reference SVGs Like the Cool Kids
permalink: articles/svg-cool-kids
---

As mentioned in my [SVG background fill article](/articles/svg-background-fill), I use [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites) to build my icon sets. This makes it incredibly simple to access specific symbols like so:

    <svg class="icon">
        <use xlink:href="sprite.svg#facebook"></use>
    </svg>

One part that I missed about this particular syntax was the simplicity that good ole icon fonts provided when referenced in the DOM:

    <i class="icon-facebook"></i>

Simple, descriptive and easy to write. Another benefit icon fonts have in this regard is the lack of referencing an external sprite file; which is done in the first example for caching purposes. Now this can be pretty easily overcome if you're using a server-side language, like PHP - by writing a simple function:

    function svg_icon($icon) {
        return '<svg class="icon">
                    <use xlink:href="/path/to/sprite.svg#' . $icon . '"></use>
                </svg>';
    }

    echo svg_icon('facebook');

My use-case was handling a sprite file generated within a WordPress environment that has many child themes; thus many different paths to different sprite files based on the respective theme. This normally would have been as easy as substituting the path to the active theme, like so:

    function svg_icon($icon) {
        return '<svg class="icon">
                    <use xlink:href="' . get_stylesheet_directory_uri() . '/assets/svg/build/sprite.svg#' . $icon . '"></use>
                </svg>';
    }

    echo svg_icon('facebook');

But, I was also using [Handlebars](http://handlebarsjs.com/), a JavaScript templating engine; and did not want to pass-down template paths to each and every view. I'd also lose the ability to write a reusable function this way as well. It was obvious that a reusable server-side function wasn't the way to go.

Remember how intuitive it is to write a reference to an icon font?

    <i class="icon-facebook"></i>

This was my ultimate end-goal, so that's what I ended up writing; only this time, as a client-side function in CoffeeScript:

    # Store the path to your sprite file
    templatePath = '/assets/svg/build/sprite.svg'
    # For my WordPress-specific needs, I'd set this variable equal to what I reference in that function as the current child-theme

    $.each $("[data-bt-icon]"), (index, element) ->
      $this = $(element)

      svg = document.createElementNS 'http://www.w3.org/2000/svg', 'svg'
      svg.setAttribute 'class', $this.attr 'class'

      use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
      use.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href',
        templatePath + '#' + $this.data 'btIcon'
      )

      svg.appendChild use
      $this.replaceWith svg
      return

I'm able to now write my SVG icons like so:

    <i class="bt-icon" data-bt-icon="facebook"></i>

The above CoffeeScript translates this to:

    <svg class="bt-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg/build/sprite.svg#facebook"></use>
    </svg>

Now we have the power of SVG sprites with the DOM simplicity of icon fonts.

### Update

For those that are interested in a library independent version, here ya go:

    # SVG Icons
    svgSpritePath = '/assets/svg/build/sprite.svg'

    ## Set multiple attributes for element
    setAttributes = (el, attrs) ->
      Array::slice.call(attrs).forEach (attr) ->
        el.setAttribute attr.name, attr.value unless attr.name is "data-bt-icon"
        return
      return

    Array::forEach.call document.querySelectorAll("[data-bt-icon]"), (element, index) ->
      svg = document.createElementNS 'http://www.w3.org/2000/svg', 'svg'
      setAttributes svg, element.attributes

      use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
      use.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'xlink:href',
        svgSpritePath + '#' + element.getAttribute "data-bt-icon"
      )

      svg.appendChild use
      element.parentNode.replaceChild svg, element
      return

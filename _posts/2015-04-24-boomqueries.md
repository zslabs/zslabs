---
layout: article
title: BoomQueries - Element Queries, Today
---

When I made the transition from agency-life to product development, my eyes were opened to the concept of truly modular components. Working under WordPress as our frontend platform; with the concept of "widgets" - it comes with "certain uncertainty" that any type of content can be placed... well anywhere. That perfectly responsive card-grid you intended to be used on a full-width homepage widget position? Well, it was just placed in a sidebar.

<div class="uk-text-center"><img src="http://media.giphy.com/media/Zo9ACzmJgoqRy/giphy.gif"></div>

What would you have to do as a work-around? Well, two options come to mind:

1. Add a modifier class to the component itself based on its position.
1. Override any/all components that could exist in different widths and rewrite all media queries to match each scenario as needed.

Neither of which are ideal. Hey, it's not all our fault. Media queries have been around for quite a while and we've done a damn good job of extending them to the best of our ability. But, like everything else in life, it's just not good enough and we want more. Enter element queries.

> Element queries is the concept of being able to interact with individual components, not based on window size, but the size of the component itself.

This isn't anything new; [Smashing Magazine](http://www.smashingmagazine.com/2013/06/25/media-queries-are-not-the-answer-element-query-polyfill/) laid it out pretty thick - and I whole heartedly agree with them. The concept of creating "polyfills" for this type of functionality isn't new either; there's plenty of libraries that approach this same problem. So, when fellow developer [<i class="bt-icon" data-bt-icon="twitter"></i>Craig Anthony](https://twitter.com/craig_anthony) and I both came across a need to use element queries, we quickly found all of the existing libraries to be too intrusive on either our DOM and/or styles. We wanted a simple manipulation library that could be molded into our existing structure and could prove to be performant enough to deal with dozens... hell hundreds of listener elements if we required it. At the end of the day, we wrote our own and we called it [BoomQueries](https://github.com/BoomTownROI/boomqueries).

Some benefits of our library are:

1. Vanilla JS
1. Made for modern browsers (IE9+) to keep dependencies small
1. NO DOM changes to get setup
1. Debounce method used on resize for more controlled intervals
1. Control over sizing classes added for more granular control

Registering, removing and refreshing components is incredibly simple thanks to a dead-simple API that still has tons of room for flexibility based on your project's setup. I've included a demo below, but I suggest you view it on [<i class="bt-icon" data-bt-icon="codepen"></i>CodePen](http://codepen.io/mcraiganthony/pen/ZYGxBV/) to see BoomQueries in-action. Stupid site container width screwing up my cool demo ;)

<p data-height="406" data-theme-id="0" data-slug-hash="ZYGxBV" data-default-tab="result" data-user="mcraiganthony" class='codepen'>See the Pen <a href='http://codepen.io/mcraiganthony/pen/ZYGxBV/'>Element Queries - Using BoomQueries</a> by Craig Anthony (<a href='http://codepen.io/mcraiganthony'>@mcraiganthony</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

BoomQueries is being used on two different systems within [BoomTown](http://www.boomtownroi.com) at scale and have been performing beautifully. Please let me know your thoughts and any projects this has helped you with!

Huge props to [<i class="bt-icon" data-bt-icon="twitter"></i>MarkFunk](https://twitter.com/markfunk) and [<i class="bt-icon" data-bt-icon="twitter"></i>JBenesch](https://twitter.com/jbenesch) for helping clean everything up and getting it ready for the masses.
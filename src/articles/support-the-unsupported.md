---
title: Support the unsupported
date: 2014-02-24
excerpt: "Pushing the web forward, while not leaving anyone behind"
---

As new technologies and trends arise in front-end development, we always take a cautious approach to ensuring compatibility with older browsers. What we've come to realize is that global usage stats are not realistic measures for every client; more that it's dependent on their current user-base and how a drastic change may affect them. Let's look at a few examples and how we can get around these common cruxes:

1. **Media Queries:** Taking a very high-level look at this - it's perfectly acceptable to assume that IE6-8 users wouldn't be able to experience all of the responsive goodness in their browser. They're old, slow and often [joked upon](http://knowyourmeme.com/memes/subcultures/internet-explorer) pieces of software that are the bane of many developer's existence. The problem arises when you deveop mobile-first; meaning you are developing for smaller screens and adjusting for larger displays. Doing this has its advantages that I won't go into detail here, but should IE users only see a mobile-view of your site? While this may be okay at times, you'll mostly get jeers. Luckily there's a library called [RespondJS](https://github.com/scottjehl/Respond) that enables media queries in browsers that don't support them. Simply include in your header (wrap in a conditional IE statement for unneeded checks in modern browsers) and you're good to go.
2. **Advanced CSS Selectors:** When using CSS frameworks like [Foundation](http://zurb.foundation.com) and [Bootstrap](http://getbootstrap.com), advanced CSS selectors are ways to reduce the size of stylesheets and provide hooks to target elements outside of the normal class or id attributes. Low-and-behold, IE6-8 no likey most of these. As with RespondJS, [Selectivizr](https://github.com/keithclark/selectivizr) is a JS library used to fill the void. Add the same as the former and you'll see automatic improvements.
3. **REM Units:** The rem unit is relative to the root—or the html —element. That means that we can define a single font size on the html element and define all rem units to be a percentage of that ([source](http://snook.ca/archives/html_and_css/font-size-with-rem)). This is helpful when requiring more exact measurements and scaling elements on a page. If you didn't guess it by now, I'll spare ya the anxiety, IE8 and below don't support REMs. There's two ways to get around this though:
    1. [REM unit polyfill](https://github.com/chuckcarpenter/REM-unit-polyfill): An all JS (and automatic) solution; similar to RespondJS and Selectivizr. As this dynamically reads your CSS and calculates appropriate px values - I've personally run into performance issues when the amount of declarations is pretty high (up to the script timing out).
    2. [Grunt pixrem](https://github.com/robwierzbowski/grunt-pixrem): As part of your build process, either duplicate your selectors as part of your distributed assets or create a "px dependent" file that you can conditionally load to IE8 and below; similar to how you would for the other JS solutions.

Sound a bit confusing? Before all of these amazing open-source libraries, front-end development was a slice of hell. Luckily, we have the tools to produce more stable, forward-thinking experiences while providing fallbacks for all the browsers that don't support them (i.e. IE; pun intended).

If you are or know someone that is a front-end developer, show that you care by upgrading some poor soul to a modern browser today.

[Original Article](http://blog.blueion.com/2014/02/24/support-the-unsupported/)

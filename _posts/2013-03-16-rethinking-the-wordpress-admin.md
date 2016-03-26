---
layout: article
title: Rethinking the WordPress Admin
permalink: articles/rethinking-the-wordpress-admin
---

As WordPress has matured further into (dare I say) an application framework, the needs of those taking full-advantage of it have progressed as well. WordPress's API has become a solid platform for building SAAS products and many have based their entire business around building themes and plugins for it.

One thing that has always mystified me - aside from all the flexibility WordPress gives us for warping and bending it to our will, is the static nature of the admin.

There's been [some progress](http://wordpress.org/extend/plugins/mp6/) on better admin styles, [better documentation resources](https://github.com/bueltge/WordPress-Admin-Style) and even some [very impressive iterations](https://twitter.com/noeltock/status/289737633507209217) and [forward-thinking ideas](http://www.noeltock.com/web-design/wordpress/rethinking-wp-admin/), but I think the problem stems much further than just styles - I believe it's structure.

<blockquote class="twitter-tweet" align="center" ><p>If WordPress wants to be taken serious as a platform to build applications the dashboard seriously needs to become themeable.</p>&mdash; Carl Hancock (@carlhancock) <a href="https://twitter.com/carlhancock/status/309474576713256961">March 7, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

As [Matt Mullenweg](http://techcrunch.com/2012/12/06/automattic-founder-matt-mullenweg-talks-wordpress-blogging-and-twitter-vs-instagram-at-leweb/) has eluded to - there are some big changes coming to WordPress to be more mobile centric. Why not take this opportunity to make a more modular and customizable experience? I strongly feel that this "foundation" (read on to see the obvious pun) would shift WordPress in the right direction.

The WordPress admin has been through several iterations from its conception and has become quite a layered mess of browser compatibility fixes and convoluted styles. But through all it's complexity, the admin is still too simple. Sure - there's some base styles, tab wrappers, etc, but these gaps have forced some plugin/theme developers to create their own interfaces for certain items, which makes for more than a few headaches for developers and clients, and only furthers our reach of standardizing a method for styling the admin.

As much as I swore not to bring up this comparison, one thing Joomla got right was adopting a CSS/JS framework for it's admin. While I don't particularly care for its implementation, choosing [Twitter Bootstrap](http://twitter.github.com/bootstrap/) has allowed Joomla developers to create consistent admin styles/experiences and allowed the core team to focus on making their platform even better.

![Foundation 4](/assets/media/build/posts/foundation-4.png)

I strongly believe that [Foundation](http://foundation.zurb.com/) is the answer for WordPress. With its recent 4.0 release, Foundation has switched to a "mobile-first" approach and has further strengthened its core values of extensibility and customization. Being built with the latest and greatest HTML5, [SASS](http://sass-lang.com/) and jQuery, Foundation comes with a [plethora of options](http://foundation.zurb.com/docs/sass.html) that would make customizing WordPress that much easier. Being a community-driven project, Foundation is used by thousand and continuously updated (just like WordPress)!

Is using a pre-built framework a bad thing? Not in my mind - it's all about "how" you use it. The site you're on right now is built off of Foundation and is customized to suite my needs - the same could be said about what could be done with the WordPress admin.

Think if it was as easy as recompilindg the SASS dependencies of the WordPress admin with pluggable settings and providing a simple filter that would load your styles instead of the core? And by settings, I don't just mean colors and fonts - utilizing the power of SASS (and more importantly [Compass](http://compass-style.org/)), the limits are endless. We'd finally be able to alter the structure of WordPress based on our needs without having to hack the output. Plus, Foundation comes with all of the [goodies](http://foundation.zurb.com/docs/) that would fill in the gaps that other developers have had to conjure-up on their own. And most importantly, with consistent output, means providing a true mobile-ready admin would now be possible.

My ideal scenario is being able to design the admin with a more defined purpose. A purpose that speaks to the audience/client that would use my product. Not a generic backend that lacks focus and consideration for those that use it, but an interface that is tailor-made for their needs. If it takes a mock-up of what I envision the WordPress admin could be to get a bit more attention to this topic, I'm game.

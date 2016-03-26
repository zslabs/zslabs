---
layout: article
title: Upgraded Yeti
permalink: articles/upgraded-yeti
---

In my [previous article]({% post_url 2013-03-31-versioned-dependencies-with-compass %}), I went over how Foundation 3 and 4 could co-exist in your development setup, making for a happier, healthier you. While there are certainly situations where you'll need to keep "legacy" projects around, my use-case was more targeted on my own setup -- just being lazy about upgrading my current site.

Not anymore though, I'm happy to announce I am now running on Foundation's latest and greatest and couldn't be happier with the decision. Overall, the process was pretty simple. Zurb has created a handy [migration guide](http://foundation.zurb.com/migration.php) that made the subtle HTML changes a breeze. The most challenging part of the transition was rethinking how my CSS was structured. Zurb went mobile-first, which means, you're really designing for your phone outta the box instead of the desktop. So, when nesting my media queries in SASS, I was changing how my site would react to larger devices (weird huh?)

Take the following in Foundation 3:

    h1 {
        color: blue;

        @include respondTo(smallScreen) {
            color: red;
        }
    }

So, on desktops, an `h1` will be blue and on a small screen (defined via their [respondTo mixin](https://github.com/zurb/foundation/blob/3-2-stable/scss/foundation/mixins/_respond-to.scss)) it would be red. But, let's look at how we'd accomplish the same thing in Foundation 4:

    h1 {
        color: red;

        @media #{$small} {
            color: blue;
        }
    }

So, other than the a slightly-more confusing media query syntax, what's going on here? Remember when I said "mobile-first"? I really meant it. The media query you see in the aforementioned snippet doesn't mean, "devices this width and smaller", it now means, "devices this width and larger". Might seem small, but this really does change everything. What seemed like a real brain-buster at first, became an enjoyable experience.

It's all about changing your comfort level. Instead of placing desktops on a pedestal, a "standard" that we all must follow, think of them as just another stepping stone for your layout. It's so much easier to build onto something than it is to take things away. And too often than not, mobile experiences are disjointed experiences that are really just masks to what your site was supposed to look like on a desktop -- just squeezed down to call them "responsive".

I really can't commend Zurb more on the decision here. It's about bridging the gap between what someone expects from a responsive site and what they actually get. There's so much more than just the new CSS structure that went into F4, so if you haven't tried it out yet, I recommend you give [Foundation](http://foundation.zurb.com/) a gander.

_If you see any initial wonkiness, try clearing your cache - otherwise let me know what you think!_

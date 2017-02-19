---
title: Less is more
date: 2014-03-09
excerpt: "Tech decisions are easy when you take a step back"
---

In my [previous article](/articles/new-guts/), I talked about some of the backend tools that went into my site rebuild; without touching any of the design elements. Being the "creative-type", I ended up feeling like the current design just wasn't up to par with my current taste. What you see now is a good two-weekends of work that I'm pretty happy with.

<div class="row">
  <div class="column-6@medium">
    <h3>Old</h3>
    ![ZS Labs: Old](/assets/media/posts/zslabs-old.jpg)
  </div>
  <div class="column-6@medium">
    <h3>New</h3>
    ![ZS Labs: New](/assets/media/posts/zslabs-new.jpg)
  </div>
</div>

The current iteration of this site is all about the details. While there may not be a lot of "extra fluff", I focused on subtle animations, clean lines and equal spacing throughout. There's lots of little nuggets to find throughout, so I hope everyone enjoys them.

One area I've always struggled with is coming up with cohesive color palettes. I started with both a light and dark base and then used Sass's [`scale-color`](http://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) function to keep things complimentary.

Even though I was tempted by [Jekyll](http://jekyllrb.com/), I stuck with [Kirby](http://getkirby.com) as my engine. As always, I used [Foundation](http://foundation.zurb.com) as the base CSS/JS framework, with [HighlightJS](http://highlightjs.org/) for code highlighting. Probably the most exciting part for me was finally finding a use for [Verb](http://www.fontspring.com/fonts/yellow-design-studio/verb), a @font-face I picked up a little over a year ago; definitely my favorite now after giving it a go.

The best piece of advice I can give for up and coming developers to seasoned veterans, is to build your own site. Use it as your playground. Experiment, break and rebuild constantly. It's these types of exercises that I truly believe keep you ahead of the curve. Everything on this site might not work perfectly in all browsers, but it's the challenge of perfecting one's work that keeps me excited.

Would love to know everyone's thoughts on the new site!

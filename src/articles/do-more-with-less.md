---
title: Do more with Less
date: 2014-08-14
excerpt: "Take full advantage of the Less preprocessor"
---

Wow it's been a while! A lot has happened over the past few months. I joined the team over at [BoomTown](http://boomtownroi.com); a super-talented group that provides end-to-end solutions for real estate firms. The transition from agency to product work was something I had always been interested in; and I can honestly say this has been the best decision I could have made for my career.

During my first few days there, I got accustomed to their infrastructure and how every piece fits together. One of the things that popped out right away was their use of [Less](http://lesscss.org). While I've always praised [Sass](http://sass-lang.com) as an amazing toolkit, it was Less that originally got me started with CSS preprocessors. In fact, it was [Foundation](http://zurb.foundation.com) that pulled me more in the Sass direction because I preferred that to Bootstrap at the time.

Let me start off by saying BoomTown isn't the type of company that forces their current technologies down your throat; they're always willing to look into and explore what we use to see if we can all learn from it - it's an extremely neutering environment. That being said, I decided to grant them that same respect and give Less another shot one night. After a short time of reading through the docs, I can confidently say that Less has "quietly" become more powerful than Sass for me. Here's a few reasons why:

### CSS imports

As I began to use [Bower](http://bower.io) more and more, I realized something - not everyone uses Sass! So, I was left with either Less or CSS files and including them in Sass just isn't an option. Less has a handy import directive that allows you to import CSS files as a Less partial:

```less
@import (less) "foo.css";
```

Simple, yet solved a huge problem I was running into. No more manually copying bower asset files over (which defeats the entire purpose of the tool) or writing a [GulpJS](http://gulpjs.com) rename task for each use-case.

### Better extends

One thing that always irked me about Sass's `@extend` function was the lack of nested selectors:

```less
.bucket {
  tr {
    color: blue;
  }
}

// Sass
// Won't work
.other-bucket {
  @extend .bucket tr;
}

// Less
// Works!
.other-bucket {
  &:extend(.bucket tr);
}
```

If you want to extend a selector with all of it's children, you simply append `all` to your extend method and your done!

```less
.other-bucket {
  &:extend(.other-bucket all);
}
```

### UIkit

Moving away from Foundation was a tough one; I had been using it for several years and had grown accustom to the syntax and predictability. Low and behold [UIkit](http://getuikit.com) - a modern CSS/JS framework built by [YooTheme](http://yootheme.com) (whom I've had a working relationship with for a number of years). Not only did I find the syntax more readable, but the entire framework was nearly a fourth in size ([source](http://yootheme.com/blog/2013/08/13/how-big-is-uikit)) while providing a stronger feature-set. I've never had the privilege of using something that has been strung through the ringer continuously to be as focused as possible. Looking through the source code shows you how much care and dedication continues to go into UIkit; and I'm happy to contribute back to the project as much as possible to help it grow.

### Closing thoughts

Overall I've found the switch from Sass to Less incredibly easy; the syntax was near identical and Less really does have a kick-ass function set that gives me everything I need. Sass works for some and I'm certainly not here to rock the boat; but if it's been a while since you've last tried Less, give it a shot, it may surprise you!

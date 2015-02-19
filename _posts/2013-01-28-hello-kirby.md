---
layout: article
title: Hello Kirby
---

I like WordPress - hell I love it. I've spent the past few years making a living off of it and can talk for hours about why it gives me that warm feeling inside. But the most important thing I've learned, is to always use the right tool for the job. For most of the client-work I do, WordPress fits the bill. With a bustling community, a slew of quality plugins and an extensible and well-documented API, developing/working with WordPress is a joy. Clients love it for its simplicity - I love it for what it represents: open source at its best.

But when it came time to rebuild this site with the premise of blogging, WordPress wasn't my first choice and I don't think any less of it because so.

Developers alike have refocused their efforts on a platform that fits their needs instead of conforming to a single, one-size-fits-all solution. [Jason Schuller](http://jason.sc/life-beyond-wordpress/), [Ben Balter](http://ben.balter.com/2012/10/01/welcome-to-the-post-cms-world/) and [Scribu](http://scribu.net/blog/switched-to-jekyll.html) are just a few examples - and without a doubt that decision has made their publishing experience more enjoyable. My decision was to use a file-based CMS called [Kirby](http://getkirby.com/). Why?

### Version Control

Since Kirby is file-based, I was able to host my entire site via a Git repository on [Beanstalk](http://bnst.lk/Uw3GHO) and deploy with [DeployHQ](http://deployhq.com). So what does this mean? What I see locally is **exactly** what I see online - something that with other Content Management Systems has been a bit of a struggle. Previewing new features, posts, etc. has never been easier and I can't imagine going back.

### No Databases

Not having a database can have its limitations, but for my needs this has been a godsend. The utter simplicity and unconscious familiarity of a file-based system, that takes me back to my Geocities days, is a welcomed addition into my workflow. No corrupt tables, collation issues or complex configurations across multiple servers. Upload files, write, publish.

### Markdown

[Markdown](http://daringfireball.net/projects/markdown/), by John Gruber, is an amazing text-to-HTML conversion tool that makes writing on the web more enjoyable. I feel more at home in the editor than a fancy GUI interface and Markdown has met all my expectations, needs and wishes with flying colors. While I'm normally plugging away in Sublime, my favorite Markdown editor is [Mou](http://mouapp.com/).

### API

I'm a sucker for nicely documented code, but am far from a PHP-guru. Luckily Kirby has a [cheat-sheet](http://cl.ly/GXBe) that made developing this site a breeze. Bastian Allgeier (the creator), has eluded to some [big changes](http://getkirby.com/blog/kirbys-first-birthday) coming to Kirby this year and has targeted upcoming releases to further improve on stability, collaboration and speed.

### Templating

Every tool has its crutch and more often than not, it comes down to theming. Luckily, I never felt constricted with how I organized my content or files with Kirby. Separating logic/presentation (which I am a strong advocate for) was a welcomed addition to how Kirby has created its tutorials and examples. Another great thing, asset control. Since Kirby doesn't impose any base CSS/JS, I was free to build this site as I saw fit. This site was built with [Codekit](http://incident57.com/codekit/), taking advantage of its compiler to minify/concatenate my SASS and JS files. What this means is a more organized local environment with all the benefits of serving my assets quickly to readers.

### Conclusion

So what does this mean for WordPress and me? Nothing in the slightest has changed. Every CMS is like a hammer and I believe you should always use the right tool for the job. Does a one-page website need to be in WordPress? Probably not. In Kirby? Meh. Be smart when creating your next website. Don't over-complicate things and choose solutions based on spite (if you want to get into the whole WordPress vs. Drupal vs. Joomla debate) or blind-ambition in sticking with WordPress for everything. But most importantly, [always be cobbling](http://www.hulu.com/watch/3362).
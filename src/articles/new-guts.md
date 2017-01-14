---
title: New guts
date: 2014-01-20
excerpt: "Pushing my tech stack further"
---

I thought it was time for a change; not design, but my backend development tools. While this site may look nearly identical to the previous version, there's lots that went on under the hood. I thought a quick run-through of the current doodads were in order.

### Grunt

I was and will always be a huge advocate for [Codekit](http://incident57.com/codekit/). It's a fantastic tool that gets you up and running without all of the setup nonsense that it can take to build a site with modern dev tools. That being said, I wanted 2014 to be a year of new exploration; new languages, methods, etc. and [Grunt](http://gruntjs.com) has definitely fit the bill. I found not only the setup, but the configuration to be pretty easy and like Codekit once was, is now an indispensable tool. My reason for moving to Grunt wasn't purely to make my setup more difficult, it was of necessity when I found Codekit didn't allow me to do what I wanted with project assets. [Here is a great article](http://24ways.org/2013/grunt-is-not-weird-and-hard/) to get you up and running with Grunt quickly.

### Bower

Like Gems are to Ruby and Composer is to PHP, frontend asset management with [Bower](http://bower.io) makes your projects that much easier to setup and maintain. Before Bower, frontend assets were always a bit of a mixed bag for me. Let's describe my previous workflow.

1. Find something amazeballs on Github, [Parsley.JS](https://github.com/guillaumepotier/Parsley.js/) possibly
1. Download latest release
1. Add it to my project manually
1. If I ever want to update to newer features/bug fixes, repeat steps 1-3 again

This might not be that big of an issue for a library or two, but in much bigger applications, this can be a bear. Bower localizes components per project, neat and tidy. And again, setup/configuration is a breeze.

### Foundation 5

The latest [Foundation](http://foundation.zurb.com) release is what actually pushed me into learning about Grunt and Bower (since that's what it uses). F5 is much faster and feels like a much more polished version than its predecessors. Don't know what Foundation 5 offers? [Here ya go](http://zurb.com/article/1280/foundation-5-blasts-off--2).

### Vagrant

The basic idea of [Vagrant](http://vagrant.io) is to create a localized server on your computer contained within a virtual machine. Why would you want this? Take all of the items I've mentioned above. Here's a few of the packages that I had installed on my computer:

* Ruby
* Sass
* Compass
* Foundation
* NodeJS
* Bower
* MAMP
* Composer
* and half-a-dozen more

The issue is my computer had become a fragile development machine. I was afraid of ever updating or modifying system files since so much was dependent on it. And what if my 4 year-old laptop decided to keel-over? I'd have quite a bit of work ahead of me to get everything setup again. Vagrant allows me to create a bare-bones server and install only the components I need. Best of all, this isn't necessarily attached to your computer, again - just localized to the project. It runs through [VirtualBox](https://www.virtualbox.org/). Want to get up and running with Vagrant? Check out [Vaprobash](https://github.com/fideloper/Vaprobash).

### Conclusion

I'm excited to continue to perfect my base project setup with these new tools which have tremendously sped up my dev workflow. If you haven't heard of any of these, check 'em out!

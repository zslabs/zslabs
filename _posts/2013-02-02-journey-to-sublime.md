---
layout: article
title: Journey to Sublime
---

![Sublime Text Screen](/assets/media/build/posts/sublime-screen.png)

Everyone has a set of tools they stand-by - the things that help them do their job better, easier and faster; and my toolkit is no different than any other. For graphics I have Photoshop and Sketch, for version control I have Tower, but my most-used and important tool in my arsenal is, Sublime Text (aka Sublime Text 2).

When I first started building websites, I used ye olde Notepad. It... got the job done. No code highlighting, auto-indention or linters, just a plain text editor. While many of you may cringe inside, it's Notepad that taught me discipline about well organized and consistent coding, which I never take for granted today.

I then had a brief stint with Dreamweaver. Dreamweaver for me has always seemed like the poor-man's code editor (mind the price tag). I never felt quite at home. Maybe it was the WYSIWYG helpers, the code/live view, or even the built-in FTP client, but the application always felt like it was trying to do too much at once. I for one don't mind learning new syntaxes, having a browser window open and switching over to Forklift to upload - but that's just me. Now I know Dreamweaver has improved since, but not enough for me to ever think about going back.

When I first came across Textmate, I didn't think much of it. On the surface, it didn't seem all that special: "Oh you've got a black editor window and different colored text, good for you". It wasn't until I started reading about all the amazing things people were doing with it that got me hooked. Coming from Dreamweaver, Textmate was a light-weight powerhouse, that provided me the features I needed, in an attractive, customizable window.

Textmate and I stayed together for quite a while, but development of the application seemed to be at a stand-still. I wasn't too worried at the time as it still worked just fine, but if you're like the average American - I wanted more. It was about a year-and-a-half ago that I stumbled upon Jeffrey Way of [Tuts Plus](https://tutsplus.com) talking about a new editor that not only rivaled Textmate, but was blowing it out of the water! As usual, I treaded lightly. As soon as I opened up Sublime though, my initial impressions were not "ah crap another text editor to get used to", they were "let's do work". I instantly fell in-love with the Textmate-inspired interface (that is - simple) and was blown-away by how well it performed out of the box.

One of the great things about Sublime, is the ability to extend it (which seems like second nature to the web-world, but is somewhat of a new concept with desktop applications). Extending Sublime is easily done with plugins, via the [Package Control](http://wbond.net/sublime_packages/package_control) by wbond. Here's a list of the plugins I use:

<ul>
<li>Additional PHP Snippets</li>
<li>Alignment</li>
<li>AutoFileName</li>
<li>BracketHighlighter</li>
<li>DockBlockr</li>
<li>Emmet</li>
<li>jQuery</li>
<li>jQuery Snippets Pack</li>
<li>Mardown Preview</li>
<li>Package Control</li>
<li>Placeholders</li>
<li>SCSS</li>
<li>SCSS Snippets</li>
<li>Search WordPress Codex</li>
<li>SidebarEnhancements</li>
<li>SublimeLinter</li>
<li>Tag</li>
<li>Theme - Soda</li>
<li>WordPress</li>
</ul>

Yet another great aspect of Sublime is the ability to override the core configuration of the application, via **Preferences > Settings - User**. Here's what I have for mine:

    {
        "bold_folder_labels": true,
        "color_scheme": "Packages/User/Monokai Soda.tmTheme",
        "file_exclude_patterns":
        [
            ".DS_Store"
        ],
        "folder_exclude_patterns":
        [
            ".git",
            ".sass-cache"
        ],
        "font_face": "Source Code Pro",
        "font_size": 13.0,
        "highlight_modified_tabs": true,
        "hot_exit": false,
        "ignored_packages":
        [
            "Vintage"
        ],
        "remember_open_files": false,
        "theme": "Soda Light.sublime-theme",
        "trim_trailing_white_space_on_save": true
    }

Whether it's jotting down quick notes, or developing a new website, Sublime Text has fit perfectly into my workflow. If you're interested in giving Sublime Text a shot, you can [download a trial](http://www.sublimetext.com/). To get up and running even quicker, Tuts Plus has [a great series](https://tutsplus.com/course/improve-workflow-in-sublime-text-2/) of free videos.

----
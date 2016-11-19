---
title: Basey - WordPress Boilerplate Theme
date: 2014-03-25
excerpt: "A developer-first WordPress theme"
---

Among the numerous technologies I use, [WordPress](http://wordpress.org) has proven to be flexible enough for simple blogs to advanced applications. Coupled with the amazing plugin ecosystem, theming is just as enjoyable; and extensible.

[Basey](http://github.com/zslabs/basey-theme) is a pet-project of mine that started about one-and-a-half years ago and has become our go-to for theme development here. The primary goal of Basey was to be all inclusive, without becoming bloated like a lot of the "all-in-one" themes you'll see out there are; focused yet still wide-open.

If you look inside [`index.php`](https://github.com/zslabs/basey-theme/blob/master/index.php), you'll notice there's not a lot of markup going on:

```php
locate_template( 'templates/header.php', true, true );

  get_template_part('templates/page', 'header');

  echo '<h1 class="entry-title">';
    basey_title();
  echo '</h1>';

  // start loop
  while ( have_posts() ) : the_post();

    // determine if template is available
    $template_available = locate_template( 'templates/teaser/' . get_post_type() . '.php' ) ? get_post_type() : false;

    switch( get_post_type() ) {
      case $template_available :
        locate_template( 'templates/teaser/' . get_post_type() . '.php', true, false );
        break;

      default:
        locate_template( 'templates/teaser/default.php', true, false );
        break;
    }
  endwhile;

  // display navigation to next/previous pages when applicable
  basey_pagination();

  // if no posts
  if ( ( !have_posts() ) || ( get_search_query() == ' ' ) ) {
    basey_no_results();
  }

locate_template( 'templates/footer.php', true, true );
```

In-fact, take a look at a few more files and you'll notice that Basey's core template logic is based-off of pluggable areas; using WordPress's [`do_action`](http://codex.wordpress.org/Function_Reference/do_action) function. Too many themes I've worked on in the past have the same markup duplicated throughout several files - and while developing, can become a real pain in the ass. While you certainly could muddle up each file as needed, Basey has an [`output.php`](https://github.com/zslabs/basey-theme/blob/master/inc/output.php) file where I typically store all of my output (example output included by default). It's easier to read for me -- and just feels right. I focused on creating organized, versatile modules that can be used across different types of setups.

While I typically use it as a base theme, Basey is also fully compatible with child themes. So, if you're using it across a multi-site setup, or want to use [Github Updater](https://github.com/afragen/github-updater) to stay-up-to-date across releases, it should fit nicely into your workflow.

All assets are compiled via [Grunt](http://gruntjs.com) and it uses [Foundation](https://github.com/zurb/foundation) as it's core frontend framework; but the minimal output really lends to the idea that you could use whatever you'd like.

I'm always looking for ways to improve Basey, so please [open up an issue](https://github.com/zslabs/basey-theme/issues) if you see anything you'd improve.

[Original Article](http://blog.blueion.com/2014/03/25/basey/)

---
title: Accessing external WordPress data
date: 2013-06-30
excerpt: "Access WordPress internal functions from another application"
---

As much as I love treating WordPress as a true application framework; bringing simplicity into the vast craziness that is the web, it can still be a bit of a heavy hammer for an entire site. If all you want is a blog and the rest of your site has no need to be controlled via an admin, or more importantly, the complexity of your page layouts seem counter-intuitive to separate into a CMS file -- that you then still have to hook up to a page in the admin anyway, then it's possible that a "fusion" site might be better in your case.

This seems pretty straight-forward at first, create your static pages and then install WordPress in a `/blog` directory and you're all set. The problem comes when you'd want to do something simple like pull-in various bits of information from your blog into your static pages. It may seem a bit tricky, but accessing WordPress data outside of WordPress isn't that complicated. Wouldn't it be great if there were a way to "start" WordPress and have access to the API without having to be in it? Low and behold:

```php
define( 'WP_USE_THEMES', false );
require_once( $_SERVER['DOCUMENT_ROOT'] . '/blog/wp-blog-header.php' );
```

There you go. Enjoy.

Just kidding, let's break it down. First, we're defining a constant `WP_USE_THEMES`. What this does is determine is determine whether WordPress should load a theme file. Okay, so I guess that makes sense, right? Not in context yet, no. Take a look in the root of your WordPress install for a file called `wp-blog-header.php`.

```php
/**
 * Loads the WordPress environment and template.
 *
 * @package WordPress
 */
if ( !isset($wp_did_header) ) {
  $wp_did_header = true;
  require_once( dirname(__FILE__) . '/wp-load.php' );
  wp();
  require_once( ABSPATH . WPINC . '/template-loader.php' );
}
```

This file loads the WordPress environment (aka what we want). The reason we wouldn't want to load just the alluring `wp-load.php` is because `wp-blog-header.php` also runs the `wp()` function, which actually sets up the global query. The `template-loader.php` file is in essense ignored since there is a check to see if `WP_USE_THEMES` has been defined or not.

So, we're loading the WordPress environment on a static PHP without loading a theme wrapper. Great, so now what? Now what not now what?! _Just as an appendage, I know that last sentence made no sense._

We can now run WordPress functions as we see fit. Here's one to grab the latest 3 posts:

```php
$args =  array(
  'numberposts' =>  3
);
$posts = get_posts( $args );

// Make sure we're returning something
if ( $posts ) {
  foreach ( $posts as $post ) {
    setup_postdata( $post );

    the_title();
  }
  wp_reset_postdata();
}
```

We're running WordPress functions outside of WordPress - simple, yet so. damn. useful.

I'll end by deflecting the hecklers by saying at a certain point, the level of your integration lends to the idea of just creating the whole damn site in WordPress, but for simpler implementations; like a blog feed, this is the bees knees.

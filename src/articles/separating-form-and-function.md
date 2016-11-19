---
title: Separating Form and Function
date: 2013-02-20
excerpt: "Bundling template logic together for easier maintenance"
---

In my previous article, [Extendable Switch Statements](/articles/extendable-switch-statements/), I talked about separating the inner-workings of the WordPress loop to more maintainable output functions. The purpose of this article, is to take a step back and create smarter wrappers for our themes.

As I continue to further perfect my process as a developer, code organization has become a must - yet WordPress' template system can feel like anything but a well-oiled machine. Templating in itself isn't an exact science, which is why there are so many different types of engines (or logics for that matter) to produce our markup. Since I use WordPress as my main application environment, I sought after a solution that utilized the core API so I didn't go too far off the beaten path.

The answer came in a quite familiar and simple concept, [`do_action`](http://codex.wordpress.org/Function_Reference/do_action). The purpose of this function is to execute a hook created by `add_action` - which in essence, can be anything we need it to.

Take a look at the following snippet for `page.php` from [Basey](http://baseytheme.com), my parent-theme I use for new projects:

```php
get_header();
  do_action('basey_main_before');
    do_action('basey_content_before');
      get_template_part('loop', 'page');
    do_action('basey_content_after');
  do_action('basey_main_after');
get_footer();
```

Doesn't seem too special, right? How about this one; for `single.php`:

```php
get_header();
  do_action('basey_main_before');
    do_action('basey_content_before');
      get_template_part('loop', 'single');
    do_action('basey_content_after');
  do_action('basey_main_after');
get_footer();
```

The only difference between these two template files is the template part they call. The surrounding wrappers map to the exact same action. What this does - is setup the logic layer "behind" your templates. By using semantically named actions, we're able to create a "template within a template".

You might be asking yourself, "then where is all the template output?!" That's the best thing about Basey - there is none. Now before you go tell on me -- there's a good reason for this which leads us back to the title of this post. Basey contains an `output.php` file that's main purpose is - to hold your output. Instead of trying to line up an element that starts in one file and ends in another -- or duplicate the same surrounding containers throughout that need to be updated congruently - this is one file to rule them all, one file to find them, one file to - ok I'll stop, you get it. Let's delve in for an example.

A typical layout might look like this:

```php
<header id="top">
  <div class="row">
    <div class="twelve columns">
      <nav>
        <!-- nav -->
      </nav>
    </div>
  </div>
</header>
<section id="content">
  <div class="row">
    <div class="twelve columns">
      <!-- content -->
    </div>
  </div>
</section>
<footer id="bottom">
  <div class="row">
    <div class="twelve columns">
      <!-- footer -->
    </div>
  </div>
</footer>
```

And from this - it's pretty self-explanatory where these pieces would normally go -> header content in `header.php`, page content throughout `page.php`, `single.php`, `archive.php`, etc. and the footer content in `footer.php`.

The problem I have with this is where the output is stored - it's not "output", it's more like "outputs". These blocks, the major components that bring your design to life, have become smaller, insignificant fragments, spread throughout a CMS-specific templating system. Instead, let's use its own API to outsmart it:

```php
// output.php

/**
 * head content
 * @return void
 */
function mysite_basey_head() {
  ob_start(); ?>

  <header id="top">
    <div class="row">
      <div class="twelve columns">
        <nav>
          <!-- nav -->
        </nav>
      </div>
    </div>
  </header>

  <?php echo ob_get_clean();
}
add_action( 'basey_head', 'mysite_basey_head' );

/**
 * content wrapper [start]
 * @return void
 */
function mysite_content_before() {
  ob_start(); ?>

  <section id="content">
    <div class="row">
      <div class="twelve columns">

  <?php echo ob_get_clean();
}
add_action( 'basey_content_before', 'mysite_content_before' );

/**
 * content wrapper [end]
 * @return void
 */
function mysite_content_after() {
  ob_start(); ?>

      </div>
    </div>
  </section>

  <?php echo ob_get_clean();
}
add_action( 'basey_content_after', 'mysite_content_after' );

/**
 * footer content
 * @return void
 */
function mysite_footer() {
  ob_start(); ?>

  <footer id="bottom">
    <div class="row">
      <div class="twelve columns">
        <!-- footer -->
      </div>
    </div>
  </footer>

  <?php echo ob_get_clean();
}
add_action( 'basey_footer', 'mysite_footer' );
```

The above is not only easier to read, but is quicker to update and can be extended/customized as needed with normal template tags. I have used this technique to build fairly large, complex sites and always felt comfortable using a single-wrapper for my output. It brings simplicity into a system that can quickly get out of control.

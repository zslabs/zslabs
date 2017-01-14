---
title: Default views for plugins
date: 2013-03-09
excerpt: "Provide default templates for your WordPress plugins"
---

Today, plugins are not just performing simple manipulations to our beloved CMS - they're creating new editing experiences, managing SEO, connecting to social networks, etc. And for all the complexities behind these plugins, developers continue to bridge the gap between the awesome-sauce they create and the end-user experience.

One such example are Custom Post Types. WordPress makes it pretty easy to [register a custom post type](http://codex.wordpress.org/Function_Reference/register_post_type), but aside from the interface built to handle them in the backend, frontend viewing is normally kept pretty minimal (if at all). I felt uneasy about creating my plugin and then asking the end-user to take the reigns and build their own frontend. Sure - it's not entirely difficult to do, but based on the scope of your plugin, without some sort of starting point, would render it moot.

Aside from the argument against creating output within plugins; and just leaving that to themes, default layouts can be a helpful starting point to integrating all the baked-in goodness of your plugin into a viewable frontend.

Let's take the example of a Directory plugin. Some common views you'll want to have are:

* **A frontpage** - for listing all the top-level categories, featured listings, etc.
* **An archive** - further categorization, teaser item listings
* **A single-view** - you guessed it Bazooka Joe, a directory item

The frontpage of the directory plugin can be achieved in a couple ways; a page template, or a shortcode. I prefer the shortcode method. And yes, I completely agree with [ Tom Mcfarlin's](http://tommcfarlin.com/wordpress-shortcodes/) case against shortcodes, but that discussion is for another day.

So we have our initial listing, but where do we go from here? How do we create custom archive or single-views for our directory plugin? Unfortunately there's no magical shortcode method here; you'd normally just need to create the `taxonomy-{taxonomy}.php` or `single-{post_type}.php` file(s) within your theme and code as needed. Again, not very user-friendly. Wouldn't it be better if the directory plugin created a default view that we could further customize? Luckily, as with all things WordPress - _there's a hook for that_.

Enter `template_include()`. This magical function allows us to hook into WordPress' view system before it reaches the end-user, meaning we can inject our own logic in before the template system kicks-in.

```php
function directory_single_template( $template ) {
  // Are we on the single-view of a directory item?
  if ( is_singular( 'directory') ) {
      // Set the loaded template to a file within our plugin
      $template = DIRECTORY_BASE_DIR . 'views/directory-templates/single-directory.php';
    }
  }

  return $template;
}

add_filter( 'template_include', 'directory_single_template' );
```

Pretty cool, huh? Within `single-directory.php` - we can create our own template and load them in for our user. But wait - template is there, but there's not much control over customizing this view. If we're trying to make it easier for our end-user, it doesn't do them much good if we've assumed how their layout is constructed (amazingly not everyone uses Twenty Twelve), so let's make it a bit easier:

```php
function directory_single_template( $template ) {
  // Are we on the single-view of a directory item?
  if ( is_singular( 'directory') ) {
      // Try to find a template file

      // Check the child theme first
      if ( file_exists( trailingslashit( get_stylesheet_directory() ) . 'directory-templates/single-directory.php' ) ) {
        $template = trailingslashit( get_stylesheet_directory() ) . 'directory-templates/single-directory.php';
      }

      // Check the parent theme next
      elseif ( file_exists( trailingslashit( get_template_directory() ) . 'directory-templates/single-directory.php' ) ) {
        // Set the loaded template to a file within our active theme directory
        $template = trailingslashit( get_template_directory() ) . 'directory-templates/single-directory.php';
      }

      // Fallback to plugin template files
      else {
        // Set the loaded template to a file within our plugin
        $template = DIRECTORY_BASE_DIR . 'views/directory-templates/single-directory.php';
      }
    }
  }

  return $template;
}

add_filter( 'template_include', 'directory_single_template' );
```

See what we did there? You can allow your default plugin view to be overridden by conditionally checking for the existence of a specific file in the active theme's directory. If it doesn't find it, load the default view as normal. We've also organized any customized views for our plugin into a separate directory for easier organization.

For completeness, you could do the same for taxonomies:

```php
function directory_taxonomy_template( $template ){
  // Are we on the tax-view of the directory?
  if ( is_tax( 'directory_cat') ) {
      // Try to find a template file

      // Check the child theme first
      if ( file_exists( trailingslashit( get_stylesheet_directory() ) . 'directory-templates/taxonomy-directory_cat.php' ) ) {
        $template = trailingslashit( get_stylesheet_directory() ) . 'directory-templates/taxonomy-directory_cat.php';
      }

      // Check the parent theme next
      elseif ( file_exists( trailingslashit( get_template_directory() ) . 'directory-templates/taxonomy-directory_cat.php' ) ) {
        // Set the loaded template to a file within our active theme directory
        $template = trailingslashit( get_template_directory() ) . 'directory-templates/taxonomy-directory_cat.php';
      }

      // Fallback to plugin template files
      else {
        // Set the loaded template to a file within our plugin
        $template = DIRECTORY_BASE_DIR . 'views/directory-templates/taxonomy-directory_cat.php';
      }
    }
  }

  return $template;
}

add_filter( 'template_include', 'directory_tax_template' );
```

The single and/or taxonomy views you write are no different than the ones you would normally create in a theme - rejoice. Now if you'd like to get even fancier, start brainstorming about adding in actions to those default views for the HTML wrappers. That way, users can customize the HTML around your default views without needing to copy anything to their directory.

Injecting default views into your plugin with `template_include` is a powerful way for your users to get up and running even quicker -- and it makes you look like a rockstar.

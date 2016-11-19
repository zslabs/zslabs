---
title: Bust That Cache
date: 2013-06-08
excerpt: "Did you refresh? Don't worry about it anymore!"
---

Let's setup a typical development scenario. You're being good lad/lass and developing locally. You're using a preprocessor like [SASS](http://sass-lang.com) or [LESS](http://lesscss.org) and [Codekit](http://incident57.com/codekit/) or [Guard](https://github.com/guard/guard) to compile your assets. You're even using version control and deploying to a staging server. First, _virtual high-five_. Having a development process like this is extremely helpful for making changes quickly and having an audit trail as your product/project matures.

Let's take it a step further and move to server optimizations. You've been searching around the web and come across [HTML5 Boilerplate's server config](https://github.com/h5bp/server-configs) drop-in. Awesome. You're now delivering your site to customers/clients while using modern-day compression techniques and all the other goodness it gives. Here's the problem. The client asks you to make a quick color change and while you see the change on your end - they don't. Now the typical response would be,

> Can you try to clear your cache?

And let's even say they don't mind doing that. But have you ever thought about what that means when you're pushing out new versions of styles/scripts to a live site? Sure, you could adjust the `ExpiresByType text/css "access plus 1 year"` time to something more reasonable like `"access plus 1 week"`, which would expire the cache on the user's machine to a week instead of a year. And while this may be fine for small color changes, what if you've actually done some bigger changes? Or have decided you don't want to tell the client to clear their cache every time you push out a new update? This just isn't very practical at its current state. Let's see what our options are:

### Query args

Using PHP for example, you can get a file's modification date with the [`filemtime`](http://php.net/manual/en/function.filemtime.php) function which takes one parameter - the file name in question. So what we could do is add that modification time as a query arg:

```php
'assets/css/app.css?version=' . date("Ymdhis", filemtime('assets/css/app.css') )
```

What we've also done above is format the date that is returned using the [`date`](http://php.net/manual/en/function.date.php) function. This will give us something like `/assets/css/app.css?version=20130608103339`

This approach does have a drawback though: according to Google, [most proxies don’t cache URLs with a query string](https://developers.google.com/speed/docs/best-practices/caching?hl=sv#LeverageProxyCaching):

> Most proxies, most notably Squid up through version 3.0, do not cache resources with a "?" in their URL even if a Cache-control: public header is present in the response. To enable proxy caching for these resources, remove query strings from references to static resources, and instead encode the parameters into the file names themselves.

### URL Rewrites

From what we learned above, the next best option would be to rewrite the asset URL as something like `/assets/css/app.20130608103339.css`

by using the following:

```php
'assets/css/app.' . date("Ymdhis", filemtime('assets/css/app.css') ) . '.css'
```

Big problemo though, `app.20130608103339.css` doesn't exist on your server. In-fact, your server might even laugh at your if you try to access this directly.

Here it comes: let's rewrite that URL using `.htaccess`:

```apache
RewriteRule ^assets/(css|js)/(.*)\.([0-9]+)\.(css|js)$ assets/$1/$2.$4 [L,NC]
```

What the above does it parse out each _chunk_ within our asset URL and when that URL pattern is accessed, it simply redirects the user to the _normal_ URL. So, what you may see on the frontend is `app.20130608103339.css`, but what is actually being interpreted is `app.css`. Win. _I'm using this technique on my site as we speak (erm, read)._

If you're using SSI, you could go about the rewrite in a similar fashion:

```markup
<!--#config timefmt="%Y%m%d%H%M%S" -->
<link rel="stylesheet" href="/assets/css/app.<!--#flastmod virtual="/assets/css/app.css" -->.css">
```

If you're using WordPress, I wrote a plugin in tandem with [W-Shadow](http://w-shadow.com) called [VersionIt](http://wordpress.org/plugins/versionit) which does this automagically for you.

Now there are certainly other options, like generating a MD5 hash with something like [grunt-cachebuster](https://github.com/felthy/grunt-cachebuster), but this is a great practice nonetheless while developing and deploying new versions of assets. Now go get 'em!

Props to [Brian Dadin](https://twitter.com/weezer311), for hammering this out with me.

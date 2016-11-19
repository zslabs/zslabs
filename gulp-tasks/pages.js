import metalsmith from 'metalsmith';
import feed from 'metalsmith-feed';
import moveUp from 'metalsmith-move-up';
import layouts from 'metalsmith-layouts';
import ignore from 'metalsmith-ignore';
import inPlace from 'metalsmith-in-place';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import collections from 'metalsmith-collections';
import dateFormatter from 'metalsmith-date-formatter';
import filemetadata from 'metalsmith-filemetadata';
//import htmlMinifier from 'metalsmith-html-minifier';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

/**
 * Middleman data output
 * @param  {boolean} logToConsole
 * @return {object}
 */
/*function debug(logToConsole) {
  return (files, metalsmith, done) => {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log('\nFILE:');
        console.log(files[f]);
      }
    }
    done();
  };
}*/

module.exports = () => {
  return () => {
    return metalsmith(process.cwd())
    .source('src')
    .clean(false)
    .metadata({
      site: {
        title: 'ZS Labs',
        url: 'https://zslabs.com',
        author: 'Zach Schnackel'
      }
    })
    .use(ignore([
      'assets/**/*',
      'templates/*'
    ]))
    .use(collections({
      pages: {
        pattern: 'pages/**/*.html'
      },
      articles: {
        pattern: 'articles/*.md',
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(dateFormatter({
      dates: [
        {
          key: 'date',
          format: 'MMM Do, YYYY'
        }
      ]
    }))
    // Automatically pass data to file patterns
    .use(filemetadata([
      {
        pattern: 'articles/*.md',
        metadata: {
          'layout': 'post.html'
        },
        preserve: true
      },
      {
        pattern: 'pages/*.html',
        metadata: {
          'layout': 'default.html'
        },
        preserve: true
      }
    ]))
    .use(markdown({
      langPrefix: 'language-'
    }))
    .use(permalinks({
      linksets: [{
        match: { collection: 'articles' }
      }]
    }))
    .use(inPlace({
      engine: 'nunjucks'
    }))
    .use(layouts({
      engine: 'nunjucks',
      directory: 'src/templates',
      default: 'default.html'
    }))
    .use(feed({
      collection: 'articles'
    }))
    .use(moveUp('pages/**/*'))
    //.use(htmlMinifier())
    .destination('dist')
    //.use(debug(true))
    .build((err) => {
      if (err) {
        console.log(err);
      }
      else {
        reload();
      }
    });
  };
};

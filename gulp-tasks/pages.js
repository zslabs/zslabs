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
import slug from 'metalsmith-slug';
import filemetadata from 'metalsmith-filemetadata';
import rootPath from 'metalsmith-rootpath';
import htmlMinifier from 'metalsmith-html-minifier';
import browserSync from 'browser-sync';
import nunjucks from 'nunjucks';

import config from './config';
import * as Utilities from './utilities';

const { reload } = browserSync;

/**
 * Middleman data output
 * @param  {boolean} logToConsole
 * @return {object}
 */
/* function debug(logToConsole) {
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
} */

// https://github.com/superwolff/metalsmith-layouts/issues/43
nunjucks.configure(['./src/templates', './dist/assets/icons', './dist/assets/media'], {
  watch: false,
  noCache: true,
});

// Get source directories
const srcDirectories = Utilities.getDirectories(config.metalsmith.src).filter(item => !item.match('articles|pages'));
// Will hold final, mutated directories
const ignoreDirectories = [];
// Loop through source directories and adjust paths based on `metalsmith-ignore` needs
srcDirectories.forEach((item) => {
  ignoreDirectories.push(
    `${item}/**/*`,
    `${item}/**/.*`,
  );
});

export default function pages() {
  return metalsmith(process.cwd())
    .source(config.metalsmith.src)
    .clean(false)
    .metadata({
      site: {
        title: config.global.title,
        url: config.global.url,
        author: config.global.author,
      },
    })
    .use(ignore(ignoreDirectories))
    .use(collections({
      pages: {
        pattern: 'pages/**/*.html',
      },
      articles: {
        pattern: 'articles/*.md',
        sortBy: 'date',
        reverse: true,
      },
    }))
    .use(dateFormatter({
      dates: [
        {
          key: 'date',
          format: 'MMM Do, YYYY',
        },
      ],
    }))
    .use(slug({
      lower: true,
    }))
    // Automatically pass data to file patterns
    .use(filemetadata([
      {
        pattern: 'articles/*.md',
        metadata: {
          layout: 'post.html',
        },
        preserve: true,
      },
      {
        pattern: 'pages/*.html',
        metadata: {
          layout: 'default.html',
        },
        preserve: true,
      },
      {
        pattern: '**/*',
        metadata: {
          currentYear: new Date().getFullYear(),
          files: Utilities.fileModTimes(config.metalsmith.built),
          placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        },
      },
    ]))
    .use(markdown({
      langPrefix: 'language-',
    }))
    .use(permalinks({
      linksets: [{
        match: { collection: 'articles' },
      }],
    }))
    .use(moveUp('pages/**/*'))
    .use(rootPath())
    .use(inPlace({
      engine: 'nunjucks',
    }))
    .use(layouts({
      engine: 'nunjucks',
      directory: 'src/templates',
      default: 'default.html',
    }))
    .use(feed({
      collection: 'articles',
    }))
    .use(htmlMinifier())
    .destination('dist')
    // .use(debug(true))
    .build((err) => {
      if (err) {
        console.log(err); // eslint-disable-line no-console
      } else {
        reload();
      }
    });
}

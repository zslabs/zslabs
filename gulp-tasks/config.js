const config = {
  global: {
    author: 'Zach Schnackel',
    url: 'https://zslabs.com',
    title: 'ZS Labs',
  },
  metalsmith: {
    src: './src',
    built: ['./dist/assets/css/site.css', './dist/assets/js/site.js'],
  },
};

export default config;

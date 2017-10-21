const $commentsTrigger = document.querySelector('[data-js="loadComments"]');

/**
 * Load comments
 * @return {void}
 */
function loadComments() {
  /* eslint-disable no-undef */
  const dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = `https://${disqus_shortname}.disqus.com/embed.js`; // eslint-disable-line camelcase
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  /* eslint-enable no-undef */
}


if ($commentsTrigger) {
  $commentsTrigger.addEventListener('click', loadComments);
}

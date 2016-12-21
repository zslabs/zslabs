const $commentsTrigger = document.querySelector('[data-js="loadComments"]');

if ($commentsTrigger) {
  $commentsTrigger.addEventListener('click', loadComments);
}

/**
 * Load comments
 * @return {void}
 */
function loadComments() {
  /* eslint-disable no-undef */
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  /* eslint-enable no-undef */
}

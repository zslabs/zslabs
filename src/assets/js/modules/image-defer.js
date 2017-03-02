import { forEach } from 'basey/core/utility';

/**
 * Defer image loading
 * @return {void}
 */
export default function imageDefer() {
  const $images = document.querySelectorAll('[data-src]');

  forEach($images, (index, value) => {
    value.setAttribute('src', value.getAttribute('data-src'));
    value.classList.add('is-loaded');
    value.removeAttribute('data-src');
  });
}

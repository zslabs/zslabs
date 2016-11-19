import Modal from 'float/src/assets/js/core/modal';
import 'float/src/assets/js/components/prism';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-less';
import imageDefer from './modules/image-defer';
import './modules/articles';
import './modules/intros';

// Init Modal component
new Modal();

// imageDefer
window.onload = imageDefer;

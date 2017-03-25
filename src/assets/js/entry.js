import 'what-input';
import Modal from 'basey/core/modal';
import OffCanvas from 'basey/core/offcanvas';
import 'basey/components/prism';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-less';
import imageDefer from './modules/image-defer';
import './modules/intros';
import './modules/comments';
import './modules/article-series';

// Init Modal component
new Modal();

// Init OffCanvas component
new OffCanvas();

// imageDefer
window.onload = imageDefer;

import Modal from 'float/src/assets/js/core/modal';
import OffCanvas from 'float/src/assets/js/core/offcanvas';
import 'float/src/assets/js/components/prism';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-less';
import imageDefer from './modules/image-defer';
import './modules/intros';

// Init Modal component
new Modal();

// Init OffCanvas component
new OffCanvas();

// imageDefer
window.onload = imageDefer;

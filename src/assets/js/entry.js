import 'what-input';
import { config } from 'basey/core/config';
import Modal from 'basey/core/modal';
import OffCanvas from 'basey/core/offcanvas';
import Icon from 'basey/core/icon';
import 'basey/components/prism';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-less';

import Icons from '../icons/icons.json';
import imageDefer from './modules/image-defer';
import './modules/intros';
import './modules/comments';
import './modules/article-series';

// Attach icons to config object
config.icons = Icons;

/* eslint-disable no-unused-vars */
const modal = new Modal();
const offcanvas = new OffCanvas();
const icon = new Icon();
/* eslint-enable no-unused-vars */

// imageDefer
window.onload = imageDefer;

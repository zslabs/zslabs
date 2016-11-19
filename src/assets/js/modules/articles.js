import { TimelineMax } from 'gsap';
import { config } from 'float/src/assets/js/core/utility';

const $body = document.body;
const $articlesTrigger = document.querySelector('[data-js="articleTrigger"]');
const $articlesClose = document.querySelector('.Articles-close');
let articlesOpen = false;
let forward = true;
let lastTime = 0;
const articleListTimeline = new TimelineMax({
  paused: true,
  onStart() {
    $body.classList.add('has-openPanel');
  },
  onComplete() {
    articlesOpen = true;
  },
  onUpdate() {
    const newTime = this.time();
    if ((forward && newTime < lastTime) || (!forward && newTime > lastTime)) {
      forward = !forward;
      if (!forward) {
        $body.classList.remove('has-openPanel');
      }
    }
    lastTime = newTime;
  },
  onReverseComplete() {
    articlesOpen = false;
  }
});

articleListTimeline
.to('.Articles', 0.5, {
  x: 0,
  autoAlpha: 1,
  ease: config.easing
});

if ($articlesTrigger && $articlesClose) {
  $articlesTrigger.addEventListener('click', () => {
    if (articlesOpen) {
      articleListTimeline.reverse();
    }
    else {
      articleListTimeline.play();
    }
  });

  $articlesClose.addEventListener('click', () => {
    articleListTimeline.reverse();
  });
}

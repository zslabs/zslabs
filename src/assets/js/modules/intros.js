import { TimelineMax } from 'gsap';

const ease = Back.easeOut.config(1.7);
const pageTimeline = new TimelineMax({
  delay: 0.5
});

pageTimeline
.staggerTo('.Header > *', 0.5, {
  y: 0,
  autoAlpha: 1,
  ease
}, 0.1, 'intro')
.to('.Intro', 0.5, {
  y: 0,
  autoAlpha: 1,
  ease
}, 'intro');

import { TweenMax } from 'gsap';

TweenMax
.to('.Article-series', 0.5, {
  delay: 0.5,
  y: 0,
  opacity: 1,
  ease: Back.easeOut.config(1.7)
});

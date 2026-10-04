/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position never disagree. Enabled only for fine pointers (mouse /
 * trackpad) without reduced-motion; touch devices keep native scrolling.
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

export function getLenis() {
  return lenis;
}

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

  lenis = new Lenis({
    lerp: 0.15,
    wheelMultiplier: 1.15,
    anchors: { offset: 0 },
  });
  lenis.on('scroll', ScrollTrigger.update);

  const instance = lenis;
  tick = (time) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

export function stopSmoothScroll() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

/** Scroll to an element or y position, smoothly when Lenis is active. */
export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0 });
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

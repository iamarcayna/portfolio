/**
 * Declarative motion layer.
 *
 * Components opt in with data attributes instead of importing GSAP:
 *
 *   data-reveal="lines"   text rises line by line from behind a mask
 *   data-reveal="clip"    media unmasks upward; its first child settles from 1.12 scale
 *   data-reveal="rule"    a hairline draws from the left
 *   data-reveal="draw"    every [data-draw] descendant draws in from the left (diagrams)
 *   data-reveal="strands" SVG paths (pathLength=1) are strung in as the element scrolls through
 *   data-reveal="fade"    small, quiet fade (use sparingly)
 *   data-reveal-delay     seconds, optional
 *   data-parallax="0.12"  scrubbed vertical drift, as a fraction of element height
 *
 * Everything is created inside one gsap.matchMedia() so it is reverted in a
 * single call between page navigations, and nothing runs when the visitor
 * prefers reduced motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const EASE = {
  out: 'expo.out',
  inOut: 'power4.inOut',
} as const;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Scope = ParentNode;

function delayOf(el: Element) {
  return Number((el as HTMLElement).dataset.revealDelay ?? 0);
}

/** Split an element into masked lines. Returns the line elements. */
export function splitLines(el: HTMLElement): HTMLElement[] {
  const split = SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'line-inner',
    aria: 'auto',
  });
  return split.lines as HTMLElement[];
}

export function revealLines(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const lines = splitLines(el);
  return gsap.from(lines, {
    yPercent: 115,
    duration: 1.15,
    ease: EASE.out,
    stagger: 0.075,
    ...vars,
  });
}

export function revealClip(el: HTMLElement, vars: gsap.TimelineVars = {}) {
  const inner = el.firstElementChild as HTMLElement | null;
  const tl = gsap.timeline(vars);
  tl.fromTo(
    el,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE.inOut },
  );
  if (inner) tl.from(inner, { scale: 1.12, duration: 1.8, ease: EASE.out }, 0);
  return tl;
}

function onEnter(el: Element, start = 'top 86%') {
  return { trigger: el, start, once: true } satisfies ScrollTrigger.Vars;
}

function bindReveals(scope: Scope) {
  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.dataset.revealManual !== undefined) return;
    const delay = delayOf(el);
    switch (el.dataset.reveal) {
      case 'lines':
        revealLines(el, { delay, scrollTrigger: onEnter(el) });
        break;
      case 'clip':
        revealClip(el, { delay, scrollTrigger: onEnter(el, 'top 90%') });
        break;
      case 'rule':
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: EASE.inOut,
          delay,
          scrollTrigger: onEnter(el, 'top 92%'),
        });
        break;
      case 'draw':
        gsap.from(el.querySelectorAll('[data-draw]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: EASE.inOut,
          stagger: 0.045,
          delay,
          scrollTrigger: onEnter(el, 'top 75%'),
        });
        break;
      case 'strands':
        gsap.fromTo(
          el.querySelectorAll('path'),
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            stagger: { each: 0.004, from: 'random' },
            scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 85%', end: 'center 55%', scrub: 0.8 },
          },
        );
        break;
      case 'fade':
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out, delay, scrollTrigger: onEnter(el) },
        );
        break;
    }
  });
}

function bindParallax(scope: Scope) {
  scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 0.1;
    gsap.fromTo(
      el,
      { yPercent: amount * 100 },
      {
        yPercent: -amount * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/**
 * Bind every declarative animation inside `scope`.
 * Returns a cleanup that reverts all tweens, triggers and splits.
 */
export function initMotion(scope: Scope = document): () => void {
  const mm = gsap.matchMedia();
  document.documentElement.classList.add('motion-ready');

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 768px)',
    },
    (ctx) => {
      const { motion, desktop } = ctx.conditions as Record<string, boolean>;
      if (!motion) {
        gsap.set('[data-reveal="fade"]', { autoAlpha: 1 });
        return;
      }
      bindReveals(scope);
      // Parallax is a desktop-only flourish; it costs more than it gives on phones.
      if (desktop) bindParallax(scope);
    },
  );

  // Fonts change line breaks; recalculate once they are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    mm.revert();
    document.documentElement.classList.remove('motion-ready');
  };
}

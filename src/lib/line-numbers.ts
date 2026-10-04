/**
 * Editor-style line numbers for long-form copy. Every container marked
 * [data-lines] gets a running count down its text blocks, one number per
 * rendered line, drawn by CSS from each block's data-ln attribute.
 */
const BLOCKS = ':scope > p, :scope > h2, :scope > h3, :scope > ul > li, :scope > ol > li';

function number(container: HTMLElement) {
  let n = 0;
  container.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => {
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    if (!lh) return;
    const lines = Math.max(1, Math.round(el.clientHeight / lh));
    el.style.setProperty('--ln-lh', `${lh}px`);
    el.dataset.ln = Array.from({ length: lines }, () => ++n).join('\n');
  });
}

export function initLineNumbers(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-lines]').forEach((container) => {
    let width = 0;
    new ResizeObserver(([entry]) => {
      // Only re-count when the text can have re-wrapped.
      if (entry.contentRect.width === width) return;
      width = entry.contentRect.width;
      number(container);
    }).observe(container);
  });
}

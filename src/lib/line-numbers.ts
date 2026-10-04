/**
 * Editor-style gutter for long-form copy, after vim's `number` + `relativenumber`.
 * Every [data-lines] container gets one number per rendered line of its text
 * blocks. Hovering a line tints it; clicking makes it the cursor line, which
 * shows its absolute number while every other line shows its distance from it.
 */
const BLOCKS = ':scope > p, :scope > h2, :scope > h3, :scope > ul > li, :scope > ol > li';

interface Line {
  top: number;
  height: number;
  left: number;
  width: number;
}

/** Offset of el inside container, ignoring transforms (reveal animations). */
function offsetWithin(el: HTMLElement, container: HTMLElement) {
  let top = 0;
  let left = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    top += node.offsetTop;
    left += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return { top, left };
}

function measure(container: HTMLElement): Line[] {
  const lines: Line[] = [];
  container.querySelectorAll<HTMLElement>(BLOCKS).forEach((el) => {
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    if (!lh) return;
    const { top, left } = offsetWithin(el, container);
    const count = Math.max(1, Math.round(el.clientHeight / lh));
    for (let i = 0; i < count; i++) lines.push({ top: top + i * lh, height: lh, left, width: el.offsetWidth });
  });
  return lines;
}

function mount(container: HTMLElement) {
  const gutter = document.createElement('div');
  gutter.className = 'ln-gutter';
  gutter.setAttribute('aria-hidden', 'true');
  const hover = document.createElement('div');
  hover.setAttribute('aria-hidden', 'true');
  hover.className = 'ln-band ln-hover';
  const cursor = document.createElement('div');
  cursor.setAttribute('aria-hidden', 'true');
  cursor.className = 'ln-band ln-cursor';
  hover.hidden = cursor.hidden = true;
  container.append(hover, cursor, gutter);

  let lines: Line[] = [];
  let current = -1;

  const place = (band: HTMLElement, i: number) => {
    const line = lines[i];
    band.hidden = !line;
    if (!line) return;
    band.style.transform = `translateY(${line.top}px)`;
    band.style.height = `${line.height}px`;
    band.style.width = `${line.left + line.width + 24}px`;
  };

  const render = () => {
    gutter.replaceChildren(
      ...lines.map((line, i) => {
        const n = document.createElement('span');
        n.textContent = String(current < 0 || i === current ? i + 1 : Math.abs(i - current));
        if (i === current) n.className = 'is-current';
        n.style.top = `${line.top}px`;
        n.style.lineHeight = `${line.height}px`;
        return n;
      }),
    );
    place(cursor, current);
  };

  const lineAt = (clientY: number) => {
    const y = clientY - container.getBoundingClientRect().top;
    return lines.findIndex((l) => y >= l.top && y < l.top + l.height);
  };

  let raf = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      lines = measure(container);
      if (current >= lines.length) current = -1;
      render();
      hover.hidden = true;
    });
  }).observe(container);

  container.addEventListener('pointermove', (e) => place(hover, lineAt(e.clientY)), { passive: true });
  container.addEventListener('pointerleave', () => (hover.hidden = true));
  container.addEventListener('click', (e) => {
    // Leave text selection and links alone.
    if (getSelection()?.toString() || (e.target as Element).closest('a, button')) return;
    const i = lineAt(e.clientY);
    if (i < 0) return;
    current = i === current ? -1 : i;
    render();
  });
}

export function initLineNumbers(root: ParentNode = document) {
  if (!window.matchMedia('(min-width: 768px)').matches) return;
  root.querySelectorAll<HTMLElement>('[data-lines]').forEach(mount);
}

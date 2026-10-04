/**
 * Marks the in-page link whose target was most recently scrolled past
 * (aria-current="location"). Works for section containers and headings alike.
 * Opt in with `data-spy` on any element containing `a[href^="#"]` links.
 */
export function initScrollSpy(root: ParentNode = document): () => void {
  const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-spy] a[href^="#"]')];
  const ids = [...new Set(links.map((a) => a.hash.slice(1)))];
  const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  if (!targets.length) return () => {};

  let frame = 0;
  let current = '';

  const update = () => {
    frame = 0;
    const line = window.innerHeight * 0.4;
    let active = '';
    for (const target of targets) {
      if (target.getBoundingClientRect().top <= line) active = target.id;
    }
    if (active === current) return;
    current = active;
    for (const link of links) {
      if (link.hash.slice(1) === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
  };
}

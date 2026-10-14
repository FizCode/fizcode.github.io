/** Fills `fill` as the page is read, names the percentage on `link`, and makes `link` scroll back to the top. */
export function watchReadProgress(link: HTMLAnchorElement, fill: HTMLElement) {
  const title = link.querySelector('.title')?.textContent ?? '';

  link.addEventListener('click', (event) => {
    event.preventDefault();
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const percent = Math.round(Math.min(1, scrollY / scrollable) * 100);
    fill.style.width = `${percent}%`;
    link.setAttribute('aria-label', `${title}, ${percent}% read. Back to top`);
  };

  addEventListener('scroll', update, { passive: true });
  update();
}

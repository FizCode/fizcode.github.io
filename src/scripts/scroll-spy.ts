/**
 * Marks the link whose target section is currently being read.
 * A section counts as read once its top has passed 25% of the viewport height; at the very bottom
 * of the page the last section wins, even if it is too short to get there.
 *
 * A link the reader chose (clicked, or named in the URL when the page opened) stays active until
 * they scroll by hand. Otherwise a short section scrolled to the top would lose to the one below it.
 */
const READING_LINE = 0.25;

export function spySections(links: HTMLAnchorElement[], onActive: (link: HTMLAnchorElement) => void) {
  const targets = links
    .map((link) => ({ link, element: document.getElementById(link.hash.slice(1)) }))
    .filter((t): t is { link: HTMLAnchorElement; element: HTMLElement } => t.element !== null);
  if (targets.length === 0) return;

  const linkForHash = () => targets.find((t) => t.link.hash === location.hash)?.link ?? null;

  let pinned = linkForHash();
  let frame = 0;
  const update = () => {
    frame = 0;
    if (pinned) return onActive(pinned);
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let active = targets[0];
    for (const target of targets) {
      if (target.element.getBoundingClientRect().top <= window.innerHeight * READING_LINE) active = target;
    }
    onActive(atBottom ? targets[targets.length - 1].link : active.link);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  for (const { link } of targets) {
    link.addEventListener('click', () => {
      pinned = link;
      onActive(link);
    });
  }
  // Wheel, touch and keys are the reader's own scrolling; the page's smooth scroll to a link is not
  for (const type of ['wheel', 'touchmove', 'keydown'] as const) {
    addEventListener(type, () => (pinned = null), { passive: true });
  }

  addEventListener('hashchange', () => {
    pinned = linkForHash();
    schedule();
  });

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}

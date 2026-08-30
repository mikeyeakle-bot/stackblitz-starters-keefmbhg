import { useEffect } from 'react';

export default function HideNextDevtools() {
  useEffect(() => {
    // stop polling after 60 s in case something goes wrong
    const deadline = Date.now() + 60_000;

    const poll = setInterval(() => {
      const portal = document.querySelector(
        'nextjs-portal'
      ) as HTMLElement | null;
      const badge = portal?.shadowRoot?.querySelector('[data-next-badge-root]');
      if (badge) {
        badge.remove(); // ✨ gone
        clearInterval(poll); // stop once we succeed
      } else if (Date.now() > deadline) {
        clearInterval(poll); // safety stop
      }
    }, 100); // check every 100 ms

    return () => clearInterval(poll);
  }, []);

  return null; // this component renders nothing
}

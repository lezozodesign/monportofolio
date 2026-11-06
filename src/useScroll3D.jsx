import { useState, useEffect } from 'react';

/**
 * Simple custom hook that synchronises the page scroll position
 * with a normalized value (0 → 1). This is enough for the 3‑D
 * scroll effects used elsewhere in the portfolio.
 *
 * It returns the current scroll ratio and a helper to convert
 * the value to a range, mimicking the API of the hook from
 * `@react-three/drei` but without adding that heavy dependency.
 */
export default function useScroll3D() {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const ratio = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      setScrollRatio(ratio);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // initialise
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // helper similar to Drei's `range` – maps a sub‑range to 0‑1
  const range = (from, distance, margin = 0) => {
    const start = from - margin;
    const end = from + distance + margin;
    if (scrollRatio <= start) return 0;
    if (scrollRatio >= end) return 1;
    return (scrollRatio - start) / (end - start);
  };

  return { scrollRatio, range };
}

import { useEffect, useRef } from 'react';

const clamp = value => Math.min(1, Math.max(0, value));

export default function ScrollProgress({ containerRef }) {
  const progressRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const hero = container.querySelector('.hero-visual');
    const timeline = container.querySelector('.timeline');
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame;

    const update = () => {
      frame = undefined;
      const scrollRange = document.documentElement.scrollHeight - innerHeight;
      const progress = scrollRange > 0 ? clamp(scrollY / scrollRange) : 0;
      const bounds = timeline?.getBoundingClientRect();
      const timelineProgress = bounds ? clamp((innerHeight * .7 - bounds.top) / Math.max(bounds.height, 1)) : 0;
      const heroShift = !preference.matches && innerWidth > 700 ? Math.min(Math.max(scrollY, 0) * .08, 28) : 0;

      // Read geometry first; transform-only updates avoid React renders on scroll.
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      hero?.style.setProperty('--hero-shift', `${heroShift}px`);
      timeline?.style.setProperty('--timeline-progress', String(timelineProgress));
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
      hero?.style.removeProperty('--hero-shift');
      timeline?.style.removeProperty('--timeline-progress');
    };
  }, [containerRef]);

  return <div className="reading-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}

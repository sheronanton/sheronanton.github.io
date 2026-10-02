import { useEffect } from 'react';

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...container.querySelectorAll('.section-heading, .about-summary, .about-note, .skill-card, .experience-item, .experience-content li, .project-card, .education-card, .credential-card, .achievement-list li, .contact-section')];
    let entryObserver;
    let exitObserver;

    const restore = () => {
      entryObserver?.disconnect();
      exitObserver?.disconnect();
      targets.forEach(element => {
        element.classList.remove('reveal-pending', 'reveal-visible');
        element.style.removeProperty('--reveal-delay');
      });
    };

    const start = () => {
      restore();
      if (preference.matches || typeof window.IntersectionObserver !== 'function') {
        return;
      }

      entryObserver = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || !target.classList.contains('reveal-pending')) return;
          target.classList.remove('reveal-pending');
          target.classList.add('reveal-visible');
        });
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

      // Reset beyond the viewport, with room for the entrance transforms.
      // Separate entry/exit boundaries prevent flicker near the screen edges.
      exitObserver = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting || target.contains(document.activeElement)) return;
          target.classList.remove('reveal-visible');
          target.classList.add('reveal-pending');
        });
      }, { threshold: 0, rootMargin: '64px 0px 64px 0px' });

      const offscreen = new Set(targets.filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom <= 0 || bounds.top >= innerHeight;
      }));

      targets.forEach(element => {
        if (element.matches('.skill-card, .education-card, .project-card, .credential-card')) {
          const index = [...element.parentElement.children].indexOf(element);
          element.style.setProperty('--reveal-delay', `${(index % 3) * 110}ms`);
        } else if (element.matches('.experience-content li')) {
          const index = [...element.parentElement.children].indexOf(element);
          element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 65}ms`);
        }
        // Keep initial visible content and focused controls immediately readable.
        if (offscreen.has(element) && !element.contains(document.activeElement)) {
          element.classList.add('reveal-pending');
        }
        entryObserver.observe(element);
        exitObserver.observe(element);
      });
    };

    const showFocusedContent = event => {
      // Keyboard users should never focus a control inside visually hidden content.
      let target = event.target.closest('.reveal-pending, .reveal-visible');
      while (target) {
        target.classList.remove('reveal-pending', 'reveal-visible');
        target = target.parentElement?.closest('.reveal-pending, .reveal-visible');
      }
    };

    start();
    preference.addEventListener('change', start);
    container.addEventListener('focusin', showFocusedContent);
    return () => {
      restore();
      preference.removeEventListener('change', start);
      container.removeEventListener('focusin', showFocusedContent);
    };
  }, [containerRef]);
}

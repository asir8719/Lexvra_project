import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useHeroScrollAnimation({
  heroRef,
  modelRef,
  slideRefs,
  comparisonRef,
}) {
  useLayoutEffect(() => {
    let cancelled = false;
    let rafId = null;
    let cleanup = () => {};

    const setup = () => {
      if (cancelled) return;

      const hero = heroRef.current;
      const model = modelRef.current;
      const [slide1, slide2, slide3] = slideRefs.map((r) => r.current);
      const comparison = comparisonRef?.current;

      if (!hero || !model || !slide1 || !slide2 || !slide3) {
        rafId = window.requestAnimationFrame(setup);
        return;
      }

      cleanup();

      const ctx = gsap.context(() => {
        gsap.set(slide1, { opacity: 1, y: 0 });
        gsap.set(slide2, { opacity: 0, y: 50 });
        gsap.set(slide3, { opacity: 0, y: 50 });

        if (comparison) {
          gsap.set(comparison, { opacity: 0, y: 20 });
        }

        const st = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;

            if (model) {
              model.rotation.y = Math.PI * 3 * progress;
              model.rotation.x = Math.PI * 0.7 * progress;
              model.rotation.z = progress > 0.5 ? Math.PI * 0.25 : 0;
              model.position.y = -0.6 * progress;
              model.scale.setScalar(1 + 0.25 * progress);
            }

            const slide1Visible = progress < 0.25 ? 1 - progress / 0.25 : 0;
            const slide2Visible = progress >= 0.25 && progress < 0.7 ? (progress - 0.25) / 0.45 : progress >= 0.7 ? 0 : 0;
            const slide3Visible = progress >= 0.7 ? (progress - 0.7) / 0.3 : 0;

            gsap.set(slide1, {
              opacity: slide1Visible,
              y: progress < 0.25 ? 0 : -40,
            });

            gsap.set(slide2, {
              opacity: slide2Visible,
              y: progress >= 0.25 && progress < 0.7 ? 0 : -40,
            });

            gsap.set(slide3, {
              opacity: slide3Visible,
              y: progress >= 0.7 ? 0 : 50,
            });

            if (comparison) {
              const comparisonVisible = progress >= 0.3 ? Math.min(1, (progress - 0.3) / 0.4) : 0;
              gsap.set(comparison, {
                opacity: comparisonVisible,
                y: comparisonVisible > 0 ? 0 : 20,
              });
            }
          },
        });

        cleanup = () => {
          st.kill();
          ctx.revert();
        };
      }, hero);

      window.setTimeout(() => ScrollTrigger.refresh(), 50);
    };

    setup();

    return () => {
      cancelled = true;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      cleanup();
    };
  }, []);
}

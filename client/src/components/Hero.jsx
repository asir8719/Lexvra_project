import { useRef } from 'react';
import HeroCanvas from './three/HeroCanvas';
import FilmGrain from './FilmGrain';
import ComparisonWidget from './ComparisonWidget';
import useHeroScrollAnimation from '../hooks/useHeroScrollAnimation';

const slides = [
  {
    align: 'center',
    title: 'Building digital experiences that matter',
    subtitle:
      'Full-stack solutions built for scale, performance, and modern user experiences. We transform ideas into powerful digital products.',
    showButtons: true,
  },
  {
    align: 'bottom-left',
    title: 'Ship products in weeks — not months',
    subtitle: 'Purpose-built infrastructure for fast delivery and reliable deployment.',
    showComparison: true,
  },
  {
    align: 'center',
    title: 'Built for trust',
    subtitle: 'Enterprise-grade security, transparent processes, and long-term partnerships.',
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const modelRef = useRef(null);
  const comparisonRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const slideRefs = [slide1Ref, slide2Ref, slide3Ref];

  useHeroScrollAnimation({ heroRef, modelRef, slideRefs, comparisonRef });

  const alignClass = {
    center: 'items-center text-center justify-center',
    'bottom-left': 'items-end text-left justify-end pb-16 md:pb-24',
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Three.js scene */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas modelRef={modelRef} />
        </div>

        {/* Top light vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/[0.03] via-transparent to-black/60" />

        {/* Film grain */}
        <FilmGrain />

        {/* Scroll slides */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-auto">
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              ref={slideRefs[i]}
              className={`absolute inset-0 flex flex-col px-0 ${alignClass[slide.align]} ${
                i === 0 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className={slide.align === 'center' ? 'max-w-4xl' : 'max-w-2xl'}>
                <h1
                  className={`font-display font-bold text-white leading-[1.08] tracking-tight mb-6 ${
                    slide.align === 'center'
                      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                      : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                  }`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-gray-400 leading-relaxed mb-10 ${
                    slide.align === 'center'
                      ? 'text-base md:text-lg max-w-2xl mx-auto'
                      : 'text-sm md:text-base max-w-lg'
                  }`}
                >
                  {slide.subtitle}
                </p>

                {slide.showButtons && (
                  <div className={`flex flex-wrap gap-4 ${slide.align === 'center' ? 'justify-center' : ''} pointer-events-auto relative z-20`}>
                    <a
                      href="/contact"
                      className="inline-flex items-center px-8 py-3 rounded-full bg-[#b8b8d4] text-black
                                 text-xs font-semibold uppercase tracking-widest hover:bg-[#cccce8] transition-colors cursor-pointer"
                    >
                      Get Started
                    </a>
                    <a
                      href="/about"
                      className="inline-flex items-center px-8 py-3 rounded-full border border-white/30 text-white
                                 text-xs font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Learn More
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Comparison widget — bottom right, Tenbin style */}
          <div
            ref={comparisonRef}
            className="absolute bottom-16 md:bottom-24 right-6 md:right-12 opacity-0 hidden md:block"
          >
            <ComparisonWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

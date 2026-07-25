import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesMenu } from '../data/services';

export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [location.hash]);

  return (
    <main className="relative z-10 pt-28 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-purple text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Our Services
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What we deliver
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            End-to-end technology services to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {servicesMenu.map((service, i) => (
            <motion.div
              key={service.slug}
              id={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-4 group scroll-mt-32"
            >
              <span className="mt-2 w-2 h-2 rounded-full bg-purple shrink-0 group-hover:scale-125 transition-transform" />
              <div className="pb-8 border-b border-white/5 flex-1">
                <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-light transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

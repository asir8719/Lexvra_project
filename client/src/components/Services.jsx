import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiDeviceMobile, HiCloud, HiColorSwatch, HiLightBulb, HiSupport } from 'react-icons/hi';
import { fetchServices } from '../utils/api';

const iconMap = {
  code: HiCode,
  mobile: HiDeviceMobile,
  cloud: HiCloud,
  design: HiColorSwatch,
  consulting: HiLightBulb,
  support: HiSupport,
};

const fallbackServices = [
  {
    _id: '1',
    title: 'Web Development',
    description: 'Custom MERN stack applications built for scale and performance.',
    icon: 'code',
    features: ['React & Node.js', 'REST & GraphQL APIs', 'Responsive Design'],
  },
  {
    _id: '2',
    title: 'Mobile Solutions',
    description: 'Cross-platform mobile apps for iOS and Android.',
    icon: 'mobile',
    features: ['React Native', 'Native Performance', 'Offline Support'],
  },
  {
    _id: '3',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure with automated deployment.',
    icon: 'cloud',
    features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines'],
  },
];

export default function Services() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setServices(fallbackServices));
  }, []);

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h2 className="section-title mb-6">
            What we <span className="text-accent">deliver</span>
          </h2>
          <p className="section-subtitle mx-auto">
            End-to-end technology services to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || HiCode;
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 group hover:border-accent/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6
                                group-hover:bg-accent/20 transition-colors">
                  <Icon className="text-2xl text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features?.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

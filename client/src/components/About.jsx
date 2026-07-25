import { motion } from 'framer-motion';
import { HiLightningBolt, HiShieldCheck, HiGlobeAlt, HiHeart } from 'react-icons/hi';

const values = [
  {
    icon: HiLightningBolt,
    title: 'Innovation First',
    description: 'We push boundaries with cutting-edge technology and creative solutions.',
  },
  {
    icon: HiShieldCheck,
    title: 'Trusted Partner',
    description: 'Built on transparency, reliability, and long-term client relationships.',
  },
  {
    icon: HiGlobeAlt,
    title: 'Global Reach',
    description: 'Serving clients worldwide with scalable, cloud-native solutions.',
  },
  {
    icon: HiHeart,
    title: 'People Centric',
    description: 'Our team and clients are at the heart of everything we build.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-purple text-sm font-medium tracking-widest uppercase mb-4 block">
            About Us
          </span>
          <h2 className="section-title mb-6">
            Crafting the future,
            <br />
            <span className="text-gray-500">one project at a time</span>
          </h2>
          <p className="section-subtitle">
            Lexvra is a full-service technology company specializing in MERN stack development,
            cloud infrastructure, and digital transformation. We help businesses build products
            that scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Our team collaborating"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6 hidden md:block">
              <div className="font-display text-3xl font-bold text-purple">12+</div>
              <div className="text-sm text-gray-400">Years of Excellence</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed">
              Founded with a vision to bridge the gap between ambitious ideas and production-ready
              software, Lexvra has grown into a team of passionate engineers, designers, and strategists.
            </p>
            <p className="text-gray-400 leading-relaxed">
              From startups to enterprise clients, we deliver end-to-end solutions — from initial
              concept and UI/UX design through development, deployment, and ongoing support.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="font-display text-2xl font-bold">150+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">30+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">98%</div>
                <div className="text-sm text-gray-500">Retention</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 hover:border-purple/20 transition-all duration-500 group"
            >
              <value.icon className="text-3xl text-purple mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

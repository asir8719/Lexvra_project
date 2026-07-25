import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchGallery } from '../utils/api';

const fallbackGallery = [
  {
    _id: '1',
    title: 'Modern Workspace',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'office',
  },
  {
    _id: '2',
    title: 'Team Collaboration',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    category: 'team',
  },
  {
    _id: '3',
    title: 'Tech Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'tech',
  },
  {
    _id: '4',
    title: 'Client Success',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    category: 'events',
  },
  {
    _id: '5',
    title: 'Product Launch',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'events',
  },
  {
    _id: '6',
    title: 'Global Reach',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    category: 'office',
  },
];

export default function Gallery() {
  const [items, setItems] = useState(fallbackGallery);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchGallery()
      .then(setItems)
      .catch(() => setItems(fallbackGallery));
  }, []);

  const categories = ['all', ...new Set(items.map((item) => item.category))];
  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="section-padding relative bg-dark-100/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-purple text-sm font-medium tracking-widest uppercase mb-4 block">
            Gallery
          </span>
          <h2 className="section-title mb-6">
            Life at <span className="text-purple">Lexvra</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A glimpse into our culture, workspace, and the moments that define us.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm capitalize transition-all duration-300 ${
                filter === cat
                  ? 'bg-purple text-white font-semibold'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0
                              group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <span className="text-xs text-purple-light uppercase tracking-widest">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

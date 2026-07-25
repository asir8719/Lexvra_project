import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { submitContact } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await submitContact(form);
      setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative bg-black">
      <div className="max-w-3xl mx-auto p-8 md:px-12 border rounded-xl bg-[#121212]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Send Us A Message</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-3">Your Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white
                           placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors"
                placeholder=""
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-3">Your Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white
                           placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors"
                placeholder=""
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-400 mb-3">Mobile Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white
                           placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors"
                placeholder=""
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm text-gray-400 mb-3">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white
                           placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors"
                placeholder=""
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-gray-400 mb-3">Your Messages *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white
                         placeholder-gray-600 focus:outline-none focus:border-white/50 transition-colors resize-none"
              placeholder=""
            />
          </div>

          {status.message && (
            <div
              className={`text-sm p-3 rounded-lg ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {status.message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                       font-semibold text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

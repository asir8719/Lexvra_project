import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiClock, HiArrowRight } from 'react-icons/hi';
import { fetchCareers } from '../utils/api';

const fallbackCareers = [
  {
    _id: '1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead development of our MERN stack applications and mentor junior developers.',
    requirements: ['5+ years experience', 'React & Node.js', 'MongoDB'],
  },
  {
    _id: '2',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Create stunning user experiences and design systems for web and mobile products.',
    requirements: ['3+ years experience', 'Figma', 'Design systems'],
  },
  {
    _id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and maintain CI/CD pipelines, cloud infrastructure, and monitoring systems.',
    requirements: ['AWS/GCP', 'Docker & Kubernetes', 'CI/CD'],
  },
];

export default function Careers() {
  const [careers, setCareers] = useState(fallbackCareers);

  useEffect(() => {
    fetchCareers()
      .then(setCareers)
      .catch(() => setCareers(fallbackCareers));
  }, []);

  return (
    <section id="careers" className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-purple text-sm font-medium tracking-widest uppercase mb-4 block">
            Careers
          </span>
          <h2 className="section-title mb-6">
            Join our <span className="text-purple">team</span>
          </h2>
          <p className="section-subtitle">
            We're always looking for talented people who are passionate about building great products.
          </p>
        </motion.div>

        <div className="space-y-4">
          {careers.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 group hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display text-xl font-semibold group-hover:text-purple-light transition-colors">
                      {job.title}
                    </h3>
                    <span className="px-3 py-0.5 text-xs bg-purple/10 text-purple-light rounded-full">
                      {job.department}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <HiLocationMarker className="text-purple" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock className="text-purple" /> {job.type}
                    </span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-light
                             hover:gap-3 transition-all duration-300 whitespace-nowrap"
                >
                  Apply Now <HiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center glass-card p-12"
        >
          <h3 className="font-display text-2xl font-bold mb-4">Don't see your role?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            We're always open to meeting exceptional talent. Send us your resume and tell us how you'd like to contribute.
          </p>
          <Link to="/contact" className="btn-primary">
            Send Your Resume
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

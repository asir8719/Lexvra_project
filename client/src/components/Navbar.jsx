import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown, HiArrowRight } from 'react-icons/hi';
import ServicesMegaMenu from './ServicesMegaMenu';
import { servicesMenu } from '../data/services';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative text-sm tracking-wide transition-colors duration-300 py-1 ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || servicesOpen ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="text-white shrink-0">
            <path d="M2 2L10 18M10 2L18 18M6 10H14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="leading-tight">
            <span className="font-display text-base font-semibold text-white block">Lexvra</span>
            <span className="text-[10px] text-gray-500 tracking-wider hidden sm:block">InFinology PVT LTD.</span>
          </div>
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-purple" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Services dropdown */}
          <div ref={servicesRef} className="relative"
               onMouseEnter={() => setServicesOpen(true)}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm tracking-wide transition-colors py-1 ${
                servicesOpen || location.pathname === '/services'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Services
              <HiChevronDown className={`text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              {(servicesOpen || location.pathname === '/services') && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-purple" />
              )}
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServicesMegaMenu onClose={() => setServicesOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20
                     text-white text-xs font-medium tracking-wide hover:bg-white/5 transition-all group"
        >
          Get In Touch
          <HiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-3 border-b border-white/5 ${isActive ? 'text-purple-light' : 'text-gray-300'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center justify-between py-3 border-b border-white/5 text-gray-300"
              >
                Services
                <HiChevronDown className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="py-4 pl-4 space-y-4">
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/services#${item.slug}`}
                      className="block"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex gap-3 items-start">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple shrink-0" />
                        <div>
                          <div className="text-white text-sm font-medium">{item.title}</div>
                          <div className="text-gray-500 text-xs">{item.description}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full
                           border border-white/20 text-white text-sm"
              >
                Get In Touch <HiArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

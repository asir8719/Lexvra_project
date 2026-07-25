import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-xl font-semibold text-white">
              Lexvra
            </Link>
            <p className="text-[10px] text-gray-600 tracking-wider mt-1 mb-4">InFinology PVT LTD.</p>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              Building digital experiences that matter. Full-stack solutions for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest text-gray-400">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-500 hover:text-purple-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest text-gray-400">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-500 hover:text-purple-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-purple-light transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">&copy; {currentYear} Lexvra InFinology PVT LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

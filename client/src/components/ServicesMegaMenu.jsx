import { Link } from 'react-router-dom';
import { leftColumn, rightColumn } from '../data/services';

function ServiceColumn({ items }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Link
          key={item.slug}
          to={`/services#${item.slug}`}
          className="group flex gap-4 items-start hover:translate-x-1 transition-transform duration-200"
        >
          <span className="mt-2 w-2 h-2 rounded-full bg-purple shrink-0 group-hover:scale-125 transition-transform" />
          <div>
            <h4 className="text-white font-semibold text-[15px] mb-1 group-hover:text-purple-light transition-colors">
              {item.title}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ServicesMegaMenu({ onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[min(920px,calc(100vw-3rem))]
                 bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 rounded-2xl
                 shadow-2xl shadow-black/50 p-8 md:p-10"
      onMouseLeave={onClose}
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <ServiceColumn items={leftColumn} />
        <ServiceColumn items={rightColumn} />
      </div>
    </div>
  );
}

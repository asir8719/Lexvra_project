const rows = [
  { label: 'Delivery', us: '2 weeks', them: '3 months' },
  { label: 'Uptime', us: '99.9%', them: '95%' },
  { label: 'Support', us: '24/7', them: 'Business hrs' },
];

export default function ComparisonWidget({ className = '' }) {
  return (
    <div className={`text-sm font-light ${className}`}>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-0 mb-4 text-gray-500">
        <span />
        <span className="text-white/80 tracking-wide">Lexvra</span>
        <span className="text-gray-600 tracking-wide">Typical</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[1fr_auto_auto] gap-x-8 py-3 border-t border-dotted border-white/15"
        >
          <span className="text-gray-500">{row.label}</span>
          <span className="text-white">{row.us}</span>
          <span className="text-gray-600">{row.them}</span>
        </div>
      ))}
    </div>
  );
}

import { ChevronLeft } from 'lucide-react';

export default function TealHeader({ title, onBack }) {
  return (
    <div className="bg-gradient-cyan text-white px-4 py-3.5 flex items-center gap-3 shrink-0 shadow-lg glow-cyan-sm">
      {onBack && (
        <button
          onClick={onBack}
          className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <span className="font-bold text-lg font-rajdhani animate-fade-in">{title}</span>
    </div>
  );
}

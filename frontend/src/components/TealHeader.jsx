import { ChevronLeft } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function TealHeader({ title, onBack }) {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-amber-500 text-white px-4 py-3.5 flex items-center gap-3 justify-between shrink-0 shadow-lg" style={{
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
    }}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <span className="font-bold text-lg font-rajdhani animate-fade-in">{title}</span>
      </div>
      <LanguageSelector />
    </div>
  );
}

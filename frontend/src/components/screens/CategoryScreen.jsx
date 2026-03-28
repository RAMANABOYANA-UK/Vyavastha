import TealHeader from '../TealHeader';
import { useUIStore, useComplaintsStore } from '../../store';
import { useState, useEffect } from 'react';
export default function CategoryScreen() {
  const { setScreen, setSelectedCategory, setActiveTab } = useUIStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = [
    { id: 'dirty_spot', icon: '🗑️', label: 'Dirty Spot' },
    { id: 'garbage_dump', icon: '🏔️', label: 'Garbage Dump' },
    { id: 'garbage_vehicle', icon: '🚛', label: 'Garbage Vehicle' },
    { id: 'burning_garbage', icon: '🔥', label: 'Burning Garbage' },
    { id: 'sweeping_not_done', icon: '🧹', label: 'Sweeping Not Done' },
    { id: 'dustbins_not_cleaned', icon: '🗑️', label: 'Dustbins Not Cleaned' },
    { id: 'open_defecation', icon: '🚽', label: 'Open Defecation' },
    { id: 'sewerage_overflow', icon: '💧', label: 'Sewerage Overflow' },
    { id: 'stagnant_water', icon: '🌊', label: 'Stagnant Water' },
    { id: 'slum_not_clean', icon: '🏚️', label: 'Slum Not Clean' },
    { id: 'overgrown_vegetation', icon: '🌿', label: 'Overgrown Vegetation' },
    { id: 'stray_animals', icon: '🐄', label: 'Stray Animals' },
  ];

  const handleBack = () => {
    setScreen('home');
    setActiveTab('home');
  };

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setScreen('form');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + categories.length) % categories.length);
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % categories.length);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TealHeader title='Choose Category' onBack={handleBack} />
      
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="py-2">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedIndex(index);
                handleSelect(cat);
              }}
              className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100 cursor-pointer transition-all ${
                selectedIndex === index
                  ? 'bg-teal-100 border-l-4 border-l-teal-600'
                  : 'bg-white hover:bg-teal-50'
              }`}
            >
              <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center text-2xl shrink-0 border ${
                selectedIndex === index
                  ? 'bg-teal-200 border-teal-600'
                  : 'bg-gray-100 border-gray-200'
              }`}>
                {cat.icon}
              </div>
              <span className={`font-semibold text-[15px] ${
                selectedIndex === index
                  ? 'text-teal-900'
                  : 'text-gray-800'
              }`}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 text-center text-xs text-gray-400 bg-gray-50 border-t">
          ↑↓ or Enter to Navigate • Click to Select • Esc Back
        </div>
      </div>
    </div>
  );
}

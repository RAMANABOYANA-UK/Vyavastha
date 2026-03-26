import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('languages.english'), flag: '🇺🇸' },
    { code: 'hi', name: t('languages.hindi'), flag: '🇮🇳' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all"
      >
        <Globe size={18} />
        <span className="text-xs font-medium">{i18n.language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                i18n.language === lang.code
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

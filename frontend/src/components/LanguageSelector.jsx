import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const languagesListRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'fil', name: 'Tagalog', flag: '🇵🇭' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    setSelectedIndex(0);
  };

  const currentLangIndex = languages.findIndex(lang => lang.code === i18n.language);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        // When closed, Enter opens the menu
        if (e.key === 'Enter') {
          e.preventDefault();
          setIsOpen(true);
          setSelectedIndex(currentLangIndex >= 0 ? currentLangIndex : 0);
        }
        return;
      }

      // When open, handle navigation
      switch (e.key) {
        case 'Enter': {
          e.preventDefault();
          handleLanguageChange(languages[selectedIndex].code);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % languages.length);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + languages.length) % languages.length);
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setIsOpen(false);
          setSelectedIndex(0);
          break;
        }
        case 'Tab': {
          // Allow Tab to close the menu
          setIsOpen(false);
          break;
        }
        default:
          break;
      }
    };

    if (isOpen || selectedIndex >= 0) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, selectedIndex, languages, currentLangIndex]);

  useEffect(() => {
    // Scroll into view for selected language
    if (isOpen && languagesListRef.current) {
      const selectedElement = languagesListRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, isOpen]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSelectedIndex(currentLangIndex >= 0 ? currentLangIndex : 0);
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
        title="Press Enter to navigate languages"
      >
        <Globe size={18} />
        <span className="text-xs font-medium">{i18n.language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div 
          ref={languagesListRef}
          className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fade-in max-h-72 overflow-y-auto"
        >
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                index === selectedIndex
                  ? 'bg-blue-200 text-blue-900 border-l-4 border-blue-600'
                  : i18n.language === lang.code
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
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
      {isOpen && (
        <div className="text-xs text-white/70 mt-2 absolute right-0 whitespace-nowrap">
          ↑↓ Navigate • Enter Select • Esc Close
        </div>
      )}
    </div>
  );
}

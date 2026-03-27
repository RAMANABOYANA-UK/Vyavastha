import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store';

const LanguageSelectionScreen = ({ onComplete }) => {
  const { i18n } = useTranslation();
  const { setUserLanguage } = useAuthStore();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', native: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', native: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', native: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳', native: 'मराठी' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳', native: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳', native: 'ગુજરાતી' },
    { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', native: 'Deutsch' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', native: 'Italiano' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', native: 'Português' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', native: 'Polski' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', native: 'Nederlands' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', native: 'Svenska' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', native: 'Türkçe' },
    { code: 'zh', name: '中文', flag: '🇨🇳', native: '中文' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', native: '日本語' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', native: '한국어' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', native: 'العربية' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', native: 'ไทย' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', native: 'Bahasa Indonesia' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', native: 'Tiếng Việt' },
    { code: 'fil', name: 'Tagalog', flag: '🇵🇭', native: 'Tagalog' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', native: 'Ελληνικά' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿', native: 'Čeština' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', native: 'עברית' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦', native: 'Українська' },
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    setUserLanguage(langCode);
  };

  const handleContinue = () => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('userLanguage', selectedLang);
    setUserLanguage(selectedLang);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-4">🌍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Select Your Language
        </h1>
        <p className="text-gray-600 text-lg">
          Choose your preferred language to continue
        </p>
      </motion.div>

      {/* Language Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                selectedLang === lang.code
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-105 shadow-lg ring-2 ring-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: selectedLang === lang.code ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl mb-2">{lang.flag}</span>
              <span className="text-xs font-semibold text-center leading-tight">
                {lang.code === selectedLang ? lang.native : lang.name}
              </span>
              {selectedLang === lang.code && (
                <span className="text-lg mt-1">✓</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={handleContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Continue
        <ArrowRight size={24} />
      </motion.button>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-gray-500 text-sm"
      >
        You can change your language anytime in the settings
      </motion.p>
    </div>
  );
};

export default LanguageSelectionScreen;

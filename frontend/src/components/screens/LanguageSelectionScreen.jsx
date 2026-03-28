import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'fil', name: 'Filipino', native: 'Tagalog', flag: '🇵🇭' }
];

const LanguageSelectionScreen = ({ onComplete }) => {
  const { i18n, t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('userLanguage') || i18n.resolvedLanguage || 'en');

  const filteredLanguages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGE_OPTIONS;
    return LANGUAGE_OPTIONS.filter((lang) =>
      lang.name.toLowerCase().includes(q) ||
      lang.native.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  }, [query]);

  const handleLanguageSelect = async (langCode) => {
    setSelectedLang(langCode);
    localStorage.setItem('userLanguage', langCode);
    await i18n.changeLanguage(langCode);
  };

  const handleContinue = async () => {
    const lang = selectedLang || 'en';
    localStorage.setItem('userLanguage', lang);
    await i18n.changeLanguage(lang);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-md">🌐</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{t('common.language')}</h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">{t('common.appSubtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-5"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.language')}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLanguages.map((lang, index) => {
            const isSelected = selectedLang === lang.code;
            return (
              <motion.button
                key={lang.code}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.01 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`rounded-2xl border bg-white px-4 py-4 text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-100 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{lang.native}</p>
                    <p className="truncate text-xs text-slate-500">{lang.name}</p>
                  </div>
                  <div className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-200'}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            {t('common.error')}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            {t('common.next')}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelectionScreen;

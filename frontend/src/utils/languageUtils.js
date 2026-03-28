// RTL Languages that require right-to-left layout
const RTL_LANGUAGES = ['ar', 'he', 'ur', 'fa', 'yi'];

/**
 * Check if a language code is a right-to-left language
 * @param {string} langCode - Language code (e.g., 'ar', 'en', 'he')
 * @returns {boolean} True if the language is RTL
 */
export const isRTLLanguage = (langCode) => {
  return RTL_LANGUAGES.includes(langCode);
};

/**
 * Set document direction based on language
 * @param {string} langCode - Language code
 */
export const setDocumentDirection = (langCode) => {
  const dir = isRTLLanguage(langCode) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = langCode;
};

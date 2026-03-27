import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import hiTranslations from './translations/hi.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import deTranslations from './translations/de.json';
import zhTranslations from './translations/zh.json';
import arTranslations from './translations/ar.json';
import ptTranslations from './translations/pt.json';
import ruTranslations from './translations/ru.json';
import jaTranslations from './translations/ja.json';
import koTranslations from './translations/ko.json';
import itTranslations from './translations/it.json';
import thTranslations from './translations/th.json';
import idTranslations from './translations/id.json';
import viTranslations from './translations/vi.json';
import trTranslations from './translations/tr.json';
import svTranslations from './translations/sv.json';
import plTranslations from './translations/pl.json';
import nlTranslations from './translations/nl.json';
import elTranslations from './translations/el.json';
import csTranslations from './translations/cs.json';
import heTranslations from './translations/he.json';
import filTranslations from './translations/fil.json';
import ukTranslations from './translations/uk.json';
import taTranslations from './translations/ta.json';
import knTranslations from './translations/kn.json';
import mrTranslations from './translations/mr.json';
import bnTranslations from './translations/bn.json';
import guTranslations from './translations/gu.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
  ar: { translation: arTranslations },
  pt: { translation: ptTranslations },
  ru: { translation: ruTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  it: { translation: itTranslations },
  th: { translation: thTranslations },
  id: { translation: idTranslations },
  vi: { translation: viTranslations },
  tr: { translation: trTranslations },
  sv: { translation: svTranslations },
  pl: { translation: plTranslations },
  nl: { translation: nlTranslations },
  el: { translation: elTranslations },
  cs: { translation: csTranslations },
  he: { translation: heTranslations },
  fil: { translation: filTranslations },
  uk: { translation: ukTranslations },
  ta: { translation: taTranslations },
  kn: { translation: knTranslations },
  mr: { translation: mrTranslations },
  bn: { translation: bnTranslations },
  gu: { translation: guTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Set default language to English
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'], // Only check localStorage, not browser language
      caches: ['localStorage'],
    },
  });

export default i18n;

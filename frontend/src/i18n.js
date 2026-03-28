import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enNew from './locales/en.json';
import hiNew from './locales/hi.json';
import taNew from './locales/ta.json';

import enLegacy from './i18n/translations/en.json';
import hiLegacy from './i18n/translations/hi.json';
import taLegacy from './i18n/translations/ta.json';
import knLegacy from './i18n/translations/kn.json';
import mrLegacy from './i18n/translations/mr.json';
import bnLegacy from './i18n/translations/bn.json';
import guLegacy from './i18n/translations/gu.json';
import esLegacy from './i18n/translations/es.json';
import frLegacy from './i18n/translations/fr.json';
import deLegacy from './i18n/translations/de.json';
import itLegacy from './i18n/translations/it.json';
import ptLegacy from './i18n/translations/pt.json';
import ruLegacy from './i18n/translations/ru.json';
import plLegacy from './i18n/translations/pl.json';
import nlLegacy from './i18n/translations/nl.json';
import svLegacy from './i18n/translations/sv.json';
import trLegacy from './i18n/translations/tr.json';
import zhLegacy from './i18n/translations/zh.json';
import jaLegacy from './i18n/translations/ja.json';
import koLegacy from './i18n/translations/ko.json';
import arLegacy from './i18n/translations/ar.json';
import thLegacy from './i18n/translations/th.json';
import idLegacy from './i18n/translations/id.json';
import viLegacy from './i18n/translations/vi.json';
import filLegacy from './i18n/translations/fil.json';

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const deepMerge = (base, override) => {
  if (!isObject(base)) return override;
  if (!isObject(override)) return override ?? base;

  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (isObject(value) && isObject(base[key])) {
      merged[key] = deepMerge(base[key], value);
    } else {
      merged[key] = value;
    }
  }
  return merged;
};

const withNewKeys = (legacy, latest = {}) => deepMerge(legacy || {}, latest || {});

const resources = {
  en: { translation: withNewKeys(enLegacy, enNew) },
  hi: { translation: withNewKeys(hiLegacy, hiNew) },
  ta: { translation: withNewKeys(taLegacy, taNew) },
  kn: { translation: withNewKeys(knLegacy, {}) },
  mr: { translation: withNewKeys(mrLegacy, {}) },
  bn: { translation: withNewKeys(bnLegacy, {}) },
  gu: { translation: withNewKeys(guLegacy, {}) },
  es: { translation: withNewKeys(esLegacy, {}) },
  fr: { translation: withNewKeys(frLegacy, {}) },
  de: { translation: withNewKeys(deLegacy, {}) },
  it: { translation: withNewKeys(itLegacy, {}) },
  pt: { translation: withNewKeys(ptLegacy, {}) },
  ru: { translation: withNewKeys(ruLegacy, {}) },
  pl: { translation: withNewKeys(plLegacy, {}) },
  nl: { translation: withNewKeys(nlLegacy, {}) },
  sv: { translation: withNewKeys(svLegacy, {}) },
  tr: { translation: withNewKeys(trLegacy, {}) },
  zh: { translation: withNewKeys(zhLegacy, {}) },
  ja: { translation: withNewKeys(jaLegacy, {}) },
  ko: { translation: withNewKeys(koLegacy, {}) },
  ar: { translation: withNewKeys(arLegacy, {}) },
  th: { translation: withNewKeys(thLegacy, {}) },
  id: { translation: withNewKeys(idLegacy, {}) },
  vi: { translation: withNewKeys(viLegacy, {}) },
  fil: { translation: withNewKeys(filLegacy, {}) }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('userLanguage') || undefined,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'userLanguage',
      caches: ['localStorage']
    },
    returnNull: false
  });

export default i18n;

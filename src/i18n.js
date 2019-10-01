import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ruLang from './locales/ru.json';
import enLang from './locales/en.json';

const resources = {
  en: {
    translation: enLang,
  },
  'ru-RU': {
    translation: ruLang,
  },
};

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
  });

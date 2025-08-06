import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './data/pt.json';
import en from './data/en.json';

const resources = {
  pt: { translation: pt },
  en: { translation: en },
};

// Initialize i18n with language detection and resources
i18n
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

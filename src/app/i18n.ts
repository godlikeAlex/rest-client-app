import ruTranslation from '@/app/locales/ru';
import enTranslation from '@/app/locales/en';

export default {
  supportedLngs: ['en', 'ru'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  resources: {
    ru: { translation: ruTranslation },
    en: { translation: enTranslation },
  },
};

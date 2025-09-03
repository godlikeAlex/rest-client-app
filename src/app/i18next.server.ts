import Backend from 'i18next-fs-backend/cjs';
import { RemixI18Next } from 'remix-i18next/server';
import i18n from '@/app/i18n';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    async findLocale(request) {
      const locale = new URL(request.url).pathname.split('/').at(1);
      return locale ?? 'en';
    },
  },
  i18next: {
    ...i18n,
  },
  plugins: [Backend],
});

export default i18next;

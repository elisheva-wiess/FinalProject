import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { heTranslations } from './locales/he';
import { enTranslations } from './locales/en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: heTranslations },
      en: { translation: enTranslations }
    },
    lng: 'he',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export function getTranslation(language: 'he' | 'en', key: string): string {
  return i18n.getFixedT(language)(key);
}

export default i18n;

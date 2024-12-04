import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ua'],
    lng: 'ua', // Мова за замовчуванням
    fallbackLng: 'en', // Резервна мова
    interpolation: {
      escapeValue: false, // Вимикаємо екранування
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json', // шлях з API
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;

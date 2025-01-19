import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'FoodBridge',
      tagline: 'Connecting surplus to need, reducing food waste together',
      dashboard: 'Dashboard',
      map: 'Find Locations',
      community: 'Community',
    },
  },
  es: {
    translation: {
      appName: 'FoodBridge',
      tagline: 'Conectando el excedente con la necesidad, reduciendo el desperdicio de alimentos juntos',
      dashboard: 'Panel',
      map: 'Ubicaciones',
      community: 'Comunidad',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
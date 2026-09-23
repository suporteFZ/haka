import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'pt-BR',
      'pt',
    ],
    tutorials: false,
  },
  bootstrap(app: StrapiApp) {
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem('STRAPI_GUIDED_TOUR');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed.tours === 'object' && Object.keys(parsed.tours).length === 0) {
            window.localStorage.removeItem('STRAPI_GUIDED_TOUR');
          }
        }
      } catch (e) {}
    }
  },
};

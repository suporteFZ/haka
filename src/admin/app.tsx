import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'pt-BR',
      'pt',
    ],
  },
  bootstrap(app: StrapiApp) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('STRAPI_GUIDED_TOUR', JSON.stringify({ enabled: false, tours: {}, completedActions: [] }));
      } catch (e) {}
    }
  },
};

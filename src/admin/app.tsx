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
        window.localStorage.removeItem('STRAPI_GUIDED_TOUR');
      } catch (e) {}
    }
  },
};

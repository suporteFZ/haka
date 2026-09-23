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
    console.log(app);
  },
};

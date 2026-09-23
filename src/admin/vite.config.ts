import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      dedupe: [
        'react',
        'react-dom',
        'react-router-dom',
        'styled-components',
        'use-context-selector',
        '@strapi/admin',
        '@strapi/strapi',
      ],
    },
  });
};

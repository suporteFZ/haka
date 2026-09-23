import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const transferService = strapi.service('admin::transfer') as any;
      if (transferService?.token) {
        const existing = await transferService.token.getBy({ name: 'auto-migration' });
        if (existing) {
          await transferService.token.revoke(existing.id);
        }
        await transferService.token.create({
          name: 'auto-migration',
          description: 'Token de migracao gerado automaticamente',
          permissions: ['push', 'pull'],
          lifespan: null,
          accessKey: '1234567890abcdef1234567890abcdef',
        });
        strapi.log.info('>>> Token de migracao configurado com sucesso! <<<');
      }
    } catch (err) {
      strapi.log.error('Erro ao configurar token de migracao:', err);
    }
  },
};

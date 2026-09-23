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

    // Auto-restaurar uploads se uploads.tar.gz estiver presente e o volume estiver vazio
    try {
      const fs = require('fs');
      const path = require('path');
      const { execSync } = require('child_process');

      const archivePath = path.resolve(process.cwd(), 'uploads.tar.gz');
      const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      if (fs.existsSync(archivePath)) {
        const fileCount = fs.readdirSync(uploadsDir).filter((f: string) => !f.startsWith('.')).length;
        if (fileCount < 10) {
          strapi.log.info('>>> Descompactando uploads.tar.gz para public/uploads... <<<');
          execSync(`tar -xzf "${archivePath}" -C "${uploadsDir}"`);
          strapi.log.info('>>> Uploads restaurados com sucesso! <<<');
        }
      }
    } catch (archiveErr) {
      strapi.log.error('Erro ao restaurar uploads.tar.gz:', archiveErr);
    }
  },
};

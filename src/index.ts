import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    // Tratar desconexões abruptas de socket do cliente (ex: streaming de vídeo cancelado ao rolar página)
    process.on('uncaughtException', (err: any) => {
      if (err?.code === 'ECONNABORTED' || err?.code === 'EPIPE' || err?.code === 'ECONNRESET') {
        // Ignora silenciosamente: desconexão normal de socket ao rolar a página ou pausar mídia
        return;
      }
      console.error('Uncaught Exception:', err);
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Tratar desconexões abruptas de cliente durante streaming de vídeo no Koa
    const app = (strapi.server as any)?.app;
    if (app) {
      app.on('error', (err: any) => {
        if (['ECONNABORTED', 'EPIPE', 'ECONNRESET', 'ECANCELED'].includes(err?.code)) {
          return;
        }
        strapi.log.error(err);
      });
    }

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

      // Habilitar permissoes publicas para api::projeto
      try {
        const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
          where: { type: 'public' },
        });
        if (publicRole) {
          const actions = [
            'api::projeto.projeto.find',
            'api::projeto.projeto.findOne',
            'api::pagina-projeto.pagina-projeto.find',
            'api::pagina-showroom.pagina-showroom.find',
            'api::categoria-projeto.categoria-projeto.find',
            'api::categoria-projeto.categoria-projeto.findOne',
          ];
          for (const action of actions) {
            const existing = await strapi.query('plugin::users-permissions.permission').findOne({
              where: { role: publicRole.id, action },
            });
            if (!existing) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action,
                  role: publicRole.id,
                },
              });
              strapi.log.info(`Permissao publica concedida: ${action}`);
            }
          }
        }
      } catch (permErr) {
        strapi.log.error('Erro ao configurar permissoes de projeto:', permErr);
      }

      // Seed inicial de categorias de projetos e vinculação de projetos existentes
      try {
        const catService = (strapi as any).documents('api::categoria-projeto.categoria-projeto');
        if (catService) {
          const defaultCats = [
            { Nome: 'SICREDI', slug: 'sicredi', Ordem: 1 },
            { Nome: 'PRIMATO', slug: 'primato', Ordem: 2 },
            { Nome: 'CORPORATIVO', slug: 'corporativo', Ordem: 3 },
          ];
          for (const cat of defaultCats) {
            const existing = await catService.findFirst({
              filters: { slug: cat.slug },
            });
            if (!existing) {
              const created = await catService.create({
                data: cat,
              });
              try {
                await catService.publish({
                  documentId: created.documentId,
                });
              } catch (_) {}
              strapi.log.info(`Categoria de projeto criada: ${cat.Nome}`);
            }
          }

          const projService = (strapi as any).documents('api::projeto.projeto');
          if (projService) {
            const projetos = await projService.findMany({
              populate: ['categorias'],
            });
            const sicrediCat = await catService.findFirst({
              filters: { slug: 'sicredi' },
            });
            if (sicrediCat) {
              for (const proj of projetos) {
                if (
                  proj.Cliente?.toUpperCase().includes('SICREDI') &&
                  (!proj.categorias || proj.categorias.length === 0)
                ) {
                  await projService.update({
                    documentId: proj.documentId,
                    data: {
                      categorias: [sicrediCat.documentId],
                    },
                  });
                  try {
                    await projService.publish({
                      documentId: proj.documentId,
                    });
                  } catch (_) {}
                  strapi.log.info(`Projeto ${proj.Titulo} vinculado à categoria SICREDI`);
                }
              }
            }
          }
        }
      } catch (catErr) {
        strapi.log.warn('Aviso no seed de categorias de projeto:', catErr);
      }

      // Seed inicial da página de Showroom
      try {
        const showroomService = (strapi as any).documents('api::pagina-showroom.pagina-showroom');
        if (showroomService) {
          const existing = await showroomService.findFirst();
          if (!existing) {
            const created = await showroomService.create({
              data: {
                Hero_tag: 'PORTFÓLIO HAKA',
                Hero_titulo: 'Nosso Showroom',
                Hero_descricao: 'Conheça o espaço onde design, ergonomia e conforto se encontram. Uma experiência sensorial para planejar seu próximo ambiente de trabalho.',
                Imersiva_tag: 'EXPERIÊNCIA IMERSIVA',
                Imersiva_titulo: 'Um espaço pensado para você vivenciar nossos produtos de perto.',
                Imersiva_descricao: 'Cada ambiente foi cuidadosamente projetado para inspirar e mostrar as possibilidades.',
                Imersiva_metricas: [
                  { Titulo: '500m²', Subtitulo: 'ÁREA DE EXPOSIÇÃO' },
                  { Titulo: '30+', Subtitulo: 'MODELOS EXPOSTOS' },
                  { Titulo: '100%', Subtitulo: 'CONSULTORIA DEDICADA' },
                ],
                Sequencia_titulo: 'Caminhada Virtual pelo Showroom',
                Sequencia_subtitulo: 'Role a página para explorar cada detalhe dos nossos ambientes integrados e soluções ergonômicas.',
                Cta_titulo: 'Quer um projeto personalizado para o seu espaço?',
                Cta_descricao: 'Descubra como otimizar o conforto e a produtividade da sua equipe. Entre em contato com nossos especialistas e receba uma proposta corporativa sob medida.',
                Cta_botao_texto: 'Solicitar Orçamento',
                Cta_botao_link: 'https://wa.me/5545999999999',
                Banner_final_titulo: 'Transforme seu ambiente de trabalho',
                Banner_final_descricao: 'Descubra como criar espaços corporativos de alto padrão com o conforto estético que sua equipe precisa para render ao máximo.',
                Banner_final_botao_texto: 'Agende uma Visita',
                Banner_final_botao_link: 'https://wa.me/5545999999999',
              },
            });
            try {
              await showroomService.publish({
                documentId: created.documentId,
              });
            } catch (_) {}
            strapi.log.info('Página Showroom inicializada com sucesso!');
          }
        }
      } catch (showroomErr) {
        strapi.log.warn('Aviso no seed da página de showroom:', showroomErr);
      }
    } catch (err) {
      strapi.log.error('Erro ao configurar token de migracao:', err);
    }
  },
};

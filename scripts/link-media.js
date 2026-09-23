const { createStrapi } = require("@strapi/strapi");

async function main() {
  const app = await createStrapi({ distDir: "./dist" }).load();

  try {
    // Buscar arquivos de vídeo e imagem para banner
    const files = await app.db.query("plugin::upload.file").findMany({});
    console.log("Total files in upload:", files.length);

    const videoFile = files.find((f) => f.mime && f.mime.startsWith("video/"));
    console.log("Video file found:", videoFile ? { id: videoFile.id, name: videoFile.name, url: videoFile.url } : "none");

    const bannerFile = files.find(
      (f) => f.name.includes("banner") || f.name.includes("Rectangle") || f.name.includes("Group_19")
    );
    console.log("Banner file candidate:", bannerFile ? { id: bannerFile.id, name: bannerFile.name, url: bannerFile.url } : "none");

    if (videoFile) {
      const product = await app.documents("api::produto.produto").findFirst({
        filters: { slug: "elements_cadeira" },
        status: "draft",
      });

      if (product) {
        console.log(`Vinculando video ao produto ${product.Nome}...`);
        await app.documents("api::produto.produto").update({
          documentId: product.documentId,
          data: {
            Video_arquivo: videoFile.id,
          },
        });
        await app.documents("api::produto.produto").publish({
          documentId: product.documentId,
        });
        console.log("Vídeo vinculado e produto republicado com sucesso!");
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await app.destroy();
  }
}

main();

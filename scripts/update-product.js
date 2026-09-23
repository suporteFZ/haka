const { createStrapi } = require("@strapi/strapi");

async function main() {
  const app = await createStrapi({ distDir: "./dist" }).load();

  try {
    // Buscar o produto elements_cadeira ou elements-cadeira
    const products = await app.documents("api::produto.produto").findMany({
      filters: {
        slug: {
          $in: ["elements_cadeira", "elements-cadeira"],
        },
      },
      status: "draft",
    });

    console.log(`Encontrados ${products.length} produtos correspondentes.`);

    const especificacoes = [
      { Chave: "Material do encosto", Valor: "Mesh, nylon e poliéster" },
      { Chave: "Material do assento", Valor: "Espuma injetada" },
      { Chave: "Apoio de cabeça", Valor: "Altura e ângulo" },
      { Chave: "Estrutura braço", Valor: "Nylon" },
      { Chave: "Cilindro de gás", Valor: "Classe 4" },
      { Chave: "Rodas", Valor: "PU" },
      { Chave: "Revestimento apoio de cabeça", Valor: "Tecido poliéster" },
      { Chave: "Estrutura", Valor: "Nylon" },
      { Chave: "Almofada dos braços", Valor: "PU" },
      { Chave: "Mecanismo", Valor: "Multifuncional" },
      { Chave: "Base", Valor: "Nylon, 70 cm" },
      { Chave: "Gama de Cores", Valor: "Preto & Cinza" },
    ];

    const medidas = [
      { Chave: "Altura do encosto", Valor: "58 - 66 cm" },
      { Chave: "Largura do encosto", Valor: "48 cm" },
      { Chave: "Profundidade do assento", Valor: "46 - 51 cm" },
      { Chave: "Largura do assento", Valor: "50 cm" },
      { Chave: "Altura do assento ao chão", Valor: "45 - 55 cm" },
      { Chave: "Altura dos braços", Valor: "28 - 36 cm" },
      { Chave: "Diâmetro da base", Valor: "70 cm" },
      { Chave: "Peso máximo suportado", Valor: "150 kg" },
    ];

    const dimensoes = [
      { Chave: "Largura total", Valor: "68 cm" },
      { Chave: "Profundidade total", Valor: "68 cm" },
      { Chave: "Altura total mínima", Valor: "118 cm" },
      { Chave: "Altura total máxima", Valor: "130 cm" },
      { Chave: "Peso líquido", Valor: "19,5 kg" },
      { Chave: "Dimensões da caixa", Valor: "72 x 38 x 65 cm" },
      { Chave: "Peso bruto", Valor: "22,0 kg" },
      { Chave: "Altura recomendada", Valor: "1.60 a 1.95 m" },
    ];

    const itensAcordeao = [
      {
        Titulo: "Apoio de cabeça",
        Texto:
          "Ajuste 3D com regulagem precisa de altura e ângulo para proporcionar suporte cervical ideal durante toda a sua jornada de trabalho.",
      },
      {
        Titulo: "Mecanismo",
        Texto:
          "Mecanismo sincronizado avançado com reclinação suave de até 135 graus e múltiplas posições de travamento com controle de tensão.",
      },
      {
        Titulo: "Assento",
        Texto:
          "Espuma anatômica injetada de alta densidade com profundidade regulável deslizante, distribuindo o peso corporal uniformemente.",
      },
      {
        Titulo: "Braços",
        Texto:
          "Apoios de braço 4D com ajuste milimétrico em altura, profundidade, largura e ângulo lateral, revestidos com almofadas macias em PU.",
      },
      {
        Titulo: "Estruturas",
        Texto:
          "Estrutura robusta fabricada em polímeros de alta resistência e engenharia durável certificada pelos mais rigorosos padrões ergonômicos.",
      },
      {
        Titulo: "Bases",
        Texto:
          "Base piramidal de 70 cm de diâmetro em nylon reforçado, garantindo máxima estabilidade, segurança e suporte para até 150 kg.",
      },
      {
        Titulo: "Tela",
        Texto:
          "Mesh respirável de alta performance e tecnologia que permite circulação contínua de ar, evitando retenção de calor e deformações ao longo do uso.",
      },
      {
        Titulo: "Encosto",
        Texto:
          "Perfil anatômico inteligente com suporte lombar dinâmico que se ajusta aos movimentos naturais da coluna para prevenir fadiga e dores.",
      },
    ];

    const tituloTexto = "Ergonomia inteligente para quem passa horas sentado";
    const texto = `A Calira foi desenvolvida para oferecer conforto, suporte e liberdade de movimento durante toda a jornada de trabalho. Seu design ergonômico acompanha a postura natural do corpo, reduzindo a pressão sobre a coluna e proporcionando uma experiência de uso mais saudável, produtiva e confortável.

Com ajustes precisos, materiais premium e um mecanismo sincronizado de última geração, a Calira adapta-se facilmente a diferentes biotipos, oferecendo suporte personalizado em cada detalhe. Seja para home office, escritório ou longas sessões de estudo e criação, ela entrega o equilíbrio ideal entre desempenho, ergonomia e sofisticação.

Diferente de cadeiras convencionais, a Calira foi projetada para se mover junto com você. Seu mecanismo sincronizado mantém o corpo constantemente apoiado durante a reclinação, enquanto o assento deslizante distribui melhor o peso e reduz a pressão sobre as pernas. O resultado é uma postura mais natural, menos fadiga e muito mais conforto ao longo do dia.

Design moderno, construção premium
Linhas elegantes, acabamento refinado e materiais de alta qualidade fazem da Calira uma cadeira que combina perfeitamente com ambientes corporativos e home offices modernos. Além da estética sofisticada, cada componente foi desenvolvido para oferecer resistência, estabilidade e longa vida útil.

Calira. O conforto que seu corpo percebe desde o primeiro momento.`;

    for (const prod of products) {
      console.log(`Atualizando produto ${prod.Nome} (${prod.documentId})...`);

      const updated = await app.documents("api::produto.produto").update({
        documentId: prod.documentId,
        data: {
          Titulo_texto: tituloTexto,
          Texto: texto,
          Especificacoes: especificacoes,
          Medidas: medidas,
          Dimensoes: dimensoes,
          Itens_acordeao: itensAcordeao,
        },
      });

      // Publicar documento atualizado
      await app.documents("api::produto.produto").publish({
        documentId: prod.documentId,
      });

      console.log(`Produto ${prod.Nome} atualizado e publicado com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao atualizar produto no Strapi:", error);
  } finally {
    await app.destroy();
  }
}

main();

import type { Schema, Struct } from '@strapi/strapi';

export interface BuscaTermo extends Struct.ComponentSchema {
  collectionName: 'components_busca_termos';
  info: {
    displayName: 'Termo de Busca';
    icon: 'search';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Termo: Schema.Attribute.String;
  };
}

export interface ElementosCaracteristicaProduto extends Struct.ComponentSchema {
  collectionName: 'components_elementos_caracteristica_produtos';
  info: {
    description: '';
    displayName: 'Caracteristica Produto';
  };
  attributes: {
    Imagem: Schema.Attribute.Media<'images'>;
    Nome: Schema.Attribute.String;
    Texto: Schema.Attribute.Text;
  };
}

export interface ElementosDepoimento extends Struct.ComponentSchema {
  collectionName: 'components_elementos_depoimentos';
  info: {
    description: 'Depoimento de cliente com texto, autor e cargo';
    displayName: 'Depoimento';
    icon: 'quote-right';
  };
  attributes: {
    Autor: Schema.Attribute.String;
    Cargo: Schema.Attribute.String;
    Texto: Schema.Attribute.Text;
  };
}

export interface ElementosItemEntregavel extends Struct.ComponentSchema {
  collectionName: 'components_elementos_item_entregaveis';
  info: {
    description: 'Item entreg\u00E1vel com \u00EDcone, t\u00EDtulo e subt\u00EDtulo';
    displayName: 'Item Entreg\u00E1vel';
  };
  attributes: {
    Icone: Schema.Attribute.Media<'images'>;
    Subtitulo: Schema.Attribute.String;
    Titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'Link Simples';
    icon: 'link';
  };
  attributes: {
    Texto: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface MenuMenu extends Struct.ComponentSchema {
  collectionName: 'components_menu_menus';
  info: {
    description: 'Pode ser um link simples ou um Mega Menu';
    displayName: 'Item de Menu (Header/Footer)';
    icon: 'bulletList';
  };
  attributes: {
    categorias: Schema.Attribute.Relation<
      'oneToMany',
      'api::categoria.categoria'
    >;
    isMegaMenu: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Link: Schema.Attribute.String;
    links_rapidos: Schema.Attribute.Component<'menu.link', true>;
    marcas: Schema.Attribute.Relation<'oneToMany', 'api::marca.marca'>;
    Nome: Schema.Attribute.String;
    produtos_destaque: Schema.Attribute.Relation<
      'oneToMany',
      'api::produto.produto'
    >;
  };
}

export interface MenuMobileItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_mobile_items';
  info: {
    displayName: 'Item do Menu Mobile';
    icon: 'bulletList';
  };
  attributes: {
    Destaque: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Link: Schema.Attribute.String;
    Nome: Schema.Attribute.String;
    Sublinks: Schema.Attribute.Component<'menu.link', true>;
  };
}

export interface ProdutoCorRevestimento extends Struct.ComponentSchema {
  collectionName: 'components_produto_cor_revestimentos';
  info: {
    description: 'Cor do revestimento com amostra, galeria de fotos e pre\u00E7o';
    displayName: 'Cor do Revestimento';
    icon: 'palette';
  };
  attributes: {
    Cor_hex: Schema.Attribute.String;
    Estoque: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    Galeria: Schema.Attribute.Media<'images', true>;
    Miniatura: Schema.Attribute.Media<'images'>;
    Nome_cor: Schema.Attribute.String & Schema.Attribute.Required;
    Preco: Schema.Attribute.Decimal;
    Preco_adicional: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    Preco_diferenciado: Schema.Attribute.Decimal;
    Preco_promocional: Schema.Attribute.Decimal;
  };
}

export interface ProdutoEspecificacaoItem extends Struct.ComponentSchema {
  collectionName: 'components_produto_especificacao_items';
  info: {
    description: 'Item chave e valor para tabelas t\u00E9cnicas';
    displayName: 'Item de Especifica\u00E7\u00E3o';
    icon: 'bulletList';
  };
  attributes: {
    Chave: Schema.Attribute.String & Schema.Attribute.Required;
    Valor: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProdutoGrupoVariacao extends Struct.ComponentSchema {
  collectionName: 'components_produto_grupo_variacaos';
  info: {
    description: 'Grupo pai de varia\u00E7\u00F5es (ex: Estrutura do Encosto, Bases, etc.)';
    displayName: 'Grupo de Varia\u00E7\u00E3o (Pai)';
    icon: 'layer';
  };
  attributes: {
    Obrigatorio: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    Opcoes: Schema.Attribute.Component<'produto.opcao-variacao', true> &
      Schema.Attribute.Required;
    Titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProdutoItemAcordeao extends Struct.ComponentSchema {
  collectionName: 'components_produto_item_acordeaos';
  info: {
    description: 'Item expans\u00EDvel de t\u00EDtulo e texto';
    displayName: 'Item de Acorde\u00E3o';
    icon: 'layer';
  };
  attributes: {
    Texto: Schema.Attribute.Text & Schema.Attribute.Required;
    Titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProdutoOpcaoMedida extends Struct.ComponentSchema {
  collectionName: 'components_produto_opcao_medidas';
  info: {
    description: 'Op\u00E7\u00E3o de medida/dimens\u00E3o para produtos como mesas e escrivaninhas';
    displayName: 'Op\u00E7\u00E3o de Medida';
    icon: 'expand';
  };
  attributes: {
    Descricao: Schema.Attribute.String;
    Estoque: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    Preco: Schema.Attribute.Decimal;
    Preco_adicional: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    Preco_promocional: Schema.Attribute.Decimal;
    Titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProdutoOpcaoVariacao extends Struct.ComponentSchema {
  collectionName: 'components_produto_opcao_variacaos';
  info: {
    description: 'Op\u00E7\u00E3o individual (ex: Preto, UP Preto, etc.)';
    displayName: 'Op\u00E7\u00E3o de Varia\u00E7\u00E3o';
    icon: 'bulletList';
  };
  attributes: {
    Cor_hex: Schema.Attribute.String;
    Foto: Schema.Attribute.Media<'images'>;
    Galeria: Schema.Attribute.Media<'images', true>;
    Nome: Schema.Attribute.String & Schema.Attribute.Required;
    Preco: Schema.Attribute.Decimal;
    Preco_adicional: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    Preco_promocional: Schema.Attribute.Decimal;
  };
}

export interface ProdutoRevestimento extends Struct.ComponentSchema {
  collectionName: 'components_produto_revestimentos';
  info: {
    description: 'Tipo de revestimento (ex: Poli\u00E9ster, Couro, Mesh) com suas respectivas cores';
    displayName: 'Revestimento';
    icon: 'layer';
  };
  attributes: {
    Cores: Schema.Attribute.Component<'produto.cor-revestimento', true> &
      Schema.Attribute.Required;
    Descricao: Schema.Attribute.String;
    Foto_amostra: Schema.Attribute.Media<'images'>;
    Nome: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProdutoVariacaoCor extends Struct.ComponentSchema {
  collectionName: 'components_produto_variacao_cors';
  info: {
    description: 'Varia\u00E7\u00E3o com cor, tamanho, fotos, pre\u00E7o e estoque';
    displayName: 'Varia\u00E7\u00E3o de Produto';
    icon: 'palette';
  };
  attributes: {
    Cor_hex: Schema.Attribute.String;
    Estoque: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    Galeria: Schema.Attribute.Media<'images', true>;
    Miniatura: Schema.Attribute.Media<'images'>;
    Nome_cor: Schema.Attribute.String;
    Preco: Schema.Attribute.Decimal;
    Preco_diferenciado: Schema.Attribute.Decimal;
    Preco_promocional: Schema.Attribute.Decimal;
    Tamanho: Schema.Attribute.String;
  };
}

export interface SecoesBannerPrincipal extends Struct.ComponentSchema {
  collectionName: 'components_secoes_banner_principals';
  info: {
    displayName: 'Banner principal';
    icon: 'landscape';
  };
  attributes: {
    Desktop: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Mobile: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Texto: Schema.Attribute.String;
    texto_botao: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Visite nosso showroom em Toledo'>;
  };
}

export interface SecoesCatalogo extends Struct.ComponentSchema {
  collectionName: 'components_secoes_catalogos';
  info: {
    description: 'Se\u00E7\u00E3o de cat\u00E1logo com tabs por categoria e cards de produto';
    displayName: 'Cat\u00E1logo';
    icon: 'grid';
  };
  attributes: {
    categorias: Schema.Attribute.Relation<
      'oneToMany',
      'api::categoria.categoria'
    >;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Cat\u00E1logo'>;
  };
}

export interface SecoesCategoriaEmDestaque extends Struct.ComponentSchema {
  collectionName: 'components_secoes_categoria_em_destaques';
  info: {
    displayName: 'Categoria em destaque';
    icon: 'link';
  };
  attributes: {
    Categoria: Schema.Attribute.Relation<
      'oneToMany',
      'api::categoria.categoria'
    >;
    Subtitulo: Schema.Attribute.Text;
    Titulo: Schema.Attribute.String;
  };
}

export interface SecoesChamadaProjetos extends Struct.ComponentSchema {
  collectionName: 'components_secoes_chamada_projetos';
  info: {
    description: 'Se\u00E7\u00E3o da Home com chamada para o portf\u00F3lio de projetos';
    displayName: 'Chamada Projetos';
    icon: 'briefcase';
  };
  attributes: {
    Descricao: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Criamos ecossistemas corporativos integrados. Nossos projetos unem ergonomia de ponta, est\u00E9tica atemporal e solu\u00E7\u00F5es que otimizam o bem-estar di\u00E1rio de equipes de alta performance.'>;
    Link_botao: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/projetos'>;
    Metrica_1_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Satisfa\u00E7\u00E3o Ergon\u00F4mica'>;
    Metrica_1_valor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'98%'>;
    Metrica_2_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'M\u00B2 Projetados'>;
    Metrica_2_valor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'50k+'>;
    projetos: Schema.Attribute.Relation<'oneToMany', 'api::projeto.projeto'>;
    Texto_botao: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ver Nosso Portf\u00F3lio'>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Design que respeita a arquitetura do corpo'>;
  };
}

export interface SecoesFeedbacks extends Struct.ComponentSchema {
  collectionName: 'components_secoes_feedbacks';
  info: {
    description: '';
    displayName: 'Feedbacks';
  };
  attributes: {
    Carrossel: Schema.Attribute.Relation<'oneToMany', 'api::feedback.feedback'>;
    Destaques: Schema.Attribute.Relation<'oneToMany', 'api::feedback.feedback'>;
    Titulo: Schema.Attribute.String;
  };
}

export interface SecoesFooter extends Struct.ComponentSchema {
  collectionName: 'components_secoes_footers';
  info: {
    description: 'Componente principal do rodap\u00E9 (inclui CTA e Footer)';
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    cidade: Schema.Attribute.String;
    cta_descricao: Schema.Attribute.Text;
    cta_imagem_fundo: Schema.Attribute.Media<'images'>;
    cta_link_botao: Schema.Attribute.String;
    cta_texto_botao: Schema.Attribute.String;
    cta_titulo: Schema.Attribute.String;
    descricao_curta: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    logo_fz: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    menu_links: Schema.Attribute.Component<'menu.menu', true>;
    redes_sociais: Schema.Attribute.Component<'secoes.redes', true>;
    telefone: Schema.Attribute.String;
    texto_copyright: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2026 HAKA Mobili\u00E1rio Corporativo. Todos os direitos reservados.'>;
  };
}

export interface SecoesMaisVendidos extends Struct.ComponentSchema {
  collectionName: 'components_secoes_mais_vendidos';
  info: {
    description: 'Se\u00E7\u00E3o de produtos mais vendidos com cards e efeito hover';
    displayName: 'Mais Vendidos';
    icon: 'shoppingCart';
  };
  attributes: {
    produtos: Schema.Attribute.Relation<'oneToMany', 'api::produto.produto'>;
    Titulo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mais vendidas'>;
  };
}

export interface SecoesProdutoDestaque extends Struct.ComponentSchema {
  collectionName: 'components_secoes_produto_destaques';
  info: {
    description: '';
    displayName: 'Produto Destaque';
  };
  attributes: {
    Caracteristicas: Schema.Attribute.Component<
      'elementos.caracteristica-produto',
      true
    >;
    DescricaoLateral: Schema.Attribute.Text;
    ImagemPrincipal: Schema.Attribute.Media<'images'>;
    NomeProduto: Schema.Attribute.String;
    Subtitulo: Schema.Attribute.String;
    TituloLateral: Schema.Attribute.String;
  };
}

export interface SecoesRedes extends Struct.ComponentSchema {
  collectionName: 'components_secoes_redes';
  info: {
    displayName: 'Redes';
    icon: 'globe';
  };
  attributes: {
    Icone: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link_rede: Schema.Attribute.String;
  };
}

export interface SecoesVideoCurtoItem extends Struct.ComponentSchema {
  collectionName: 'components_secoes_video_curto_items';
  info: {
    displayName: 'Video Curto Item';
    icon: 'play';
  };
  attributes: {
    Legenda: Schema.Attribute.String;
    Thumbnail: Schema.Attribute.Media<'images'>;
    Video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SecoesVideosCurtos extends Struct.ComponentSchema {
  collectionName: 'components_secoes_videos_curtos';
  info: {
    displayName: 'Videos Curtos';
    icon: 'play';
  };
  attributes: {
    Subtitulo: Schema.Attribute.Text;
    Titulo: Schema.Attribute.String;
    Videos: Schema.Attribute.Component<'secoes.video-curto-item', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'busca.termo': BuscaTermo;
      'elementos.caracteristica-produto': ElementosCaracteristicaProduto;
      'elementos.depoimento': ElementosDepoimento;
      'elementos.item-entregavel': ElementosItemEntregavel;
      'menu.link': MenuLink;
      'menu.menu': MenuMenu;
      'menu.mobile-item': MenuMobileItem;
      'produto.cor-revestimento': ProdutoCorRevestimento;
      'produto.especificacao-item': ProdutoEspecificacaoItem;
      'produto.grupo-variacao': ProdutoGrupoVariacao;
      'produto.item-acordeao': ProdutoItemAcordeao;
      'produto.opcao-medida': ProdutoOpcaoMedida;
      'produto.opcao-variacao': ProdutoOpcaoVariacao;
      'produto.revestimento': ProdutoRevestimento;
      'produto.variacao-cor': ProdutoVariacaoCor;
      'secoes.banner-principal': SecoesBannerPrincipal;
      'secoes.catalogo': SecoesCatalogo;
      'secoes.categoria-em-destaque': SecoesCategoriaEmDestaque;
      'secoes.chamada-projetos': SecoesChamadaProjetos;
      'secoes.feedbacks': SecoesFeedbacks;
      'secoes.footer': SecoesFooter;
      'secoes.mais-vendidos': SecoesMaisVendidos;
      'secoes.produto-destaque': SecoesProdutoDestaque;
      'secoes.redes': SecoesRedes;
      'secoes.video-curto-item': SecoesVideoCurtoItem;
      'secoes.videos-curtos': SecoesVideosCurtos;
    }
  }
}

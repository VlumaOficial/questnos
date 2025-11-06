// Mapeamento completo da estrutura hierárquica do questionário
// Matérias → Habilidades → Sub-habilidades

export interface SubSkill {
  id: string;
  label: string;
  questionPath: string; // Caminho completo no schema
}

export interface Skill {
  id: string;
  label: string;
  subSkills: SubSkill[];
}

export interface Subject {
  id: string;
  label: string;
  skills: Skill[];
}

export const SUBJECT_HIERARCHY: Subject[] = [
  {
    id: 'brandingRebranding',
    label: 'Branding & Rebranding',
    skills: [
      {
        id: 'estrategiaDeMarca',
        label: 'Estratégia de Marca',
        subSkills: [
          { id: 'desenvolvimentoIdentidadeVisual', label: 'Desenvolvimento de Identidade Visual', questionPath: 'brandingRebranding.estrategiaDeMarca.desenvolvimentoIdentidadeVisual' },
          { id: 'criacaoNamingTaglines', label: 'Criação de Naming e Taglines', questionPath: 'brandingRebranding.estrategiaDeMarca.criacaoNamingTaglines' },
          { id: 'arquiteturaMarca', label: 'Arquitetura de Marca', questionPath: 'brandingRebranding.estrategiaDeMarca.arquiteturaMarca' },
          { id: 'posicionamentoEstrategico', label: 'Posicionamento Estratégico', questionPath: 'brandingRebranding.estrategiaDeMarca.posicionamentoEstrategico' },
          { id: 'brandGuidelinesManuais', label: 'Brand Guidelines e Manuais', questionPath: 'brandingRebranding.estrategiaDeMarca.brandGuidelinesManuais' },
          { id: 'pesquisaMercadoPersonas', label: 'Pesquisa de Mercado e Personas', questionPath: 'brandingRebranding.estrategiaDeMarca.pesquisaMercadoPersonas' },
          { id: 'analiseConcorrencia', label: 'Análise de Concorrência', questionPath: 'brandingRebranding.estrategiaDeMarca.analiseConcorrencia' },
        ],
      },
      {
        id: 'rebranding',
        label: 'Rebranding',
        subSkills: [
          { id: 'auditoriaMarcaExistente', label: 'Auditoria de Marca Existente', questionPath: 'brandingRebranding.rebranding.auditoriaMarcaExistente' },
          { id: 'estrategiaTransicaoMarca', label: 'Estratégia de Transição de Marca', questionPath: 'brandingRebranding.rebranding.estrategiaTransicaoMarca' },
          { id: 'gestaoMudancaOrganizacional', label: 'Gestão de Mudança Organizacional', questionPath: 'brandingRebranding.rebranding.gestaoMudancaOrganizacional' },
          { id: 'comunicacaoRebranding', label: 'Comunicação de Rebranding', questionPath: 'brandingRebranding.rebranding.comunicacaoRebranding' },
        ],
      },
    ],
  },
  {
    id: 'copywriting',
    label: 'Copywriting',
    skills: [
      {
        id: 'tecnicasDeEscrita',
        label: 'Técnicas de Escrita',
        subSkills: [
          { id: 'headlinesTitulosPersuasivos', label: 'Headlines e Títulos Persuasivos', questionPath: 'copywriting.tecnicasDeEscrita.headlinesTitulosPersuasivos' },
          { id: 'callToActionEfetivos', label: 'Call to Action Efetivos', questionPath: 'copywriting.tecnicasDeEscrita.callToActionEfetivos' },
          { id: 'storytellingComercial', label: 'Storytelling Comercial', questionPath: 'copywriting.tecnicasDeEscrita.storytellingComercial' },
          { id: 'copywritingConversao', label: 'Copywriting para Conversão', questionPath: 'copywriting.tecnicasDeEscrita.copywritingConversao' },
          { id: 'seoCopywriting', label: 'SEO Copywriting', questionPath: 'copywriting.tecnicasDeEscrita.seoCopywriting' },
          { id: 'microcopyUxWriting', label: 'Microcopy e UX Writing', questionPath: 'copywriting.tecnicasDeEscrita.microcopyUxWriting' },
        ],
      },
      {
        id: 'formatos',
        label: 'Formatos',
        subSkills: [
          { id: 'anunciosPagos', label: 'Anúncios Pagos', questionPath: 'copywriting.formatos.anunciosPagos' },
          { id: 'emailMarketing', label: 'Email Marketing', questionPath: 'copywriting.formatos.emailMarketing' },
          { id: 'scriptsVideo', label: 'Scripts para Vídeo', questionPath: 'copywriting.formatos.scriptsVideo' },
          { id: 'copyRedesSociais', label: 'Copy para Redes Sociais', questionPath: 'copywriting.formatos.copyRedesSociais' },
          { id: 'salesPages', label: 'Sales Pages', questionPath: 'copywriting.formatos.salesPages' },
        ],
      },
    ],
  },
  {
    id: 'redacao',
    label: 'Redação',
    skills: [
      {
        id: 'conteudoEditorial',
        label: 'Conteúdo Editorial',
        subSkills: [
          { id: 'artigosBlogSeo', label: 'Artigos de Blog com SEO', questionPath: 'redacao.conteudoEditorial.artigosBlogSeo' },
          { id: 'pressReleases', label: 'Press Releases', questionPath: 'redacao.conteudoEditorial.pressReleases' },
          { id: 'casosEstudo', label: 'Casos de Estudo', questionPath: 'redacao.conteudoEditorial.casosEstudo' },
          { id: 'ebooksWhitepapers', label: 'eBooks e Whitepapers', questionPath: 'redacao.conteudoEditorial.ebooksWhitepapers' },
          { id: 'newsletters', label: 'Newsletters', questionPath: 'redacao.conteudoEditorial.newsletters' },
          { id: 'roteirosScripts', label: 'Roteiros e Scripts', questionPath: 'redacao.conteudoEditorial.roteirosScripts' },
        ],
      },
      {
        id: 'tomVoz',
        label: 'Tom e Voz',
        subSkills: [
          { id: 'adaptacaoLinguagemPublico', label: 'Adaptação de Linguagem ao Público', questionPath: 'redacao.tomVoz.adaptacaoLinguagemPublico' },
          { id: 'redacaoTecnica', label: 'Redação Técnica', questionPath: 'redacao.tomVoz.redacaoTecnica' },
          { id: 'redacaoCriativa', label: 'Redação Criativa', questionPath: 'redacao.tomVoz.redacaoCriativa' },
          { id: 'revisaoEdicaoTextos', label: 'Revisão e Edição de Textos', questionPath: 'redacao.tomVoz.revisaoEdicaoTextos' },
          { id: 'gramaticaOrtografiaPtBr', label: 'Gramática e Ortografia (PT-BR)', questionPath: 'redacao.tomVoz.gramaticaOrtografiaPtBr' },
        ],
      },
    ],
  },
  {
    id: 'arteDesign',
    label: 'Arte & Design',
    skills: [
      {
        id: 'designGrafico',
        label: 'Design Gráfico',
        subSkills: [
          { id: 'adobePhotoshop', label: 'Adobe Photoshop', questionPath: 'arteDesign.designGrafico.adobePhotoshop' },
          { id: 'adobeIllustrator', label: 'Adobe Illustrator', questionPath: 'arteDesign.designGrafico.adobeIllustrator' },
          { id: 'adobeInDesign', label: 'Adobe InDesign', questionPath: 'arteDesign.designGrafico.adobeInDesign' },
          { id: 'figma', label: 'Figma', questionPath: 'arteDesign.designGrafico.figma' },
          { id: 'canvaPro', label: 'Canva Pro', questionPath: 'arteDesign.designGrafico.canvaPro' },
          { id: 'corelDRAW', label: 'CorelDRAW', questionPath: 'arteDesign.designGrafico.corelDRAW' },
        ],
      },
      {
        id: 'habilidadesCriativas',
        label: 'Habilidades Criativas',
        subSkills: [
          { id: 'teoriaCores', label: 'Teoria das Cores', questionPath: 'arteDesign.habilidadesCriativas.teoriaCores' },
          { id: 'tipografia', label: 'Tipografia', questionPath: 'arteDesign.habilidadesCriativas.tipografia' },
          { id: 'composicaoVisual', label: 'Composição Visual', questionPath: 'arteDesign.habilidadesCriativas.composicaoVisual' },
          { id: 'ilustracaoDigital', label: 'Ilustração Digital', questionPath: 'arteDesign.habilidadesCriativas.ilustracaoDigital' },
          { id: 'manipulacaoImagens', label: 'Manipulação de Imagens', questionPath: 'arteDesign.habilidadesCriativas.manipulacaoImagens' },
          { id: 'motionGraphicsBasico', label: 'Motion Graphics Básico', questionPath: 'arteDesign.habilidadesCriativas.motionGraphicsBasico' },
          { id: 'designApresentacoes', label: 'Design de Apresentações', questionPath: 'arteDesign.habilidadesCriativas.designApresentacoes' },
        ],
      },
      {
        id: 'materiais',
        label: 'Materiais',
        subSkills: [
          { id: 'pecasRedesSociais', label: 'Peças para Redes Sociais', questionPath: 'arteDesign.materiais.pecasRedesSociais' },
          { id: 'bannersOutdoors', label: 'Banners e Outdoors', questionPath: 'arteDesign.materiais.bannersOutdoors' },
          { id: 'materiaisImpressos', label: 'Materiais Impressos', questionPath: 'arteDesign.materiais.materiaisImpressos' },
          { id: 'embalagens', label: 'Embalagens', questionPath: 'arteDesign.materiais.embalagens' },
          { id: 'identidadeVisualCompleta', label: 'Identidade Visual Completa', questionPath: 'arteDesign.materiais.identidadeVisualCompleta' },
        ],
      },
    ],
  },
  {
    id: 'midiaSocial',
    label: 'Mídia Social',
    skills: [
      {
        id: 'plataformas',
        label: 'Plataformas',
        subSkills: [
          { id: 'instagram', label: 'Instagram', questionPath: 'midiaSocial.plataformas.instagram' },
          { id: 'facebook', label: 'Facebook', questionPath: 'midiaSocial.plataformas.facebook' },
          { id: 'linkedin', label: 'LinkedIn', questionPath: 'midiaSocial.plataformas.linkedin' },
          { id: 'tiktok', label: 'TikTok', questionPath: 'midiaSocial.plataformas.tiktok' },
          { id: 'youtube', label: 'YouTube', questionPath: 'midiaSocial.plataformas.youtube' },
          { id: 'twitterX', label: 'Twitter/X', questionPath: 'midiaSocial.plataformas.twitterX' },
          { id: 'pinterest', label: 'Pinterest', questionPath: 'midiaSocial.plataformas.pinterest' },
        ],
      },
      {
        id: 'gestao',
        label: 'Gestão',
        subSkills: [
          { id: 'planejamentoConteudo', label: 'Planejamento de Conteúdo', questionPath: 'midiaSocial.gestao.planejamentoConteudo' },
          { id: 'calendarioEditorial', label: 'Calendário Editorial', questionPath: 'midiaSocial.gestao.calendarioEditorial' },
          { id: 'analiseMetricasKpis', label: 'Análise de Métricas e KPIs', questionPath: 'midiaSocial.gestao.analiseMetricasKpis' },
          { id: 'gerenciamentoComunidade', label: 'Gerenciamento de Comunidade', questionPath: 'midiaSocial.gestao.gerenciamentoComunidade' },
          { id: 'atendimentoCliente', label: 'Atendimento ao Cliente', questionPath: 'midiaSocial.gestao.atendimentoCliente' },
          { id: 'gestaoCrises', label: 'Gestão de Crises', questionPath: 'midiaSocial.gestao.gestaoCrises' },
        ],
      },
      {
        id: 'ferramentas',
        label: 'Ferramentas',
        subSkills: [
          { id: 'metaBusinessSuite', label: 'Meta Business Suite', questionPath: 'midiaSocial.ferramentas.metaBusinessSuite' },
          { id: 'hootsuiteBuffer', label: 'Hootsuite/Buffer', questionPath: 'midiaSocial.ferramentas.hootsuiteBuffer' },
          { id: 'sproutSocial', label: 'Sprout Social', questionPath: 'midiaSocial.ferramentas.sproutSocial' },
          { id: 'laterPlanable', label: 'Later/Planable', questionPath: 'midiaSocial.ferramentas.laterPlanable' },
          { id: 'analiseNativaPlataformas', label: 'Análise Nativa das Plataformas', questionPath: 'midiaSocial.ferramentas.analiseNativaPlataformas' },
        ],
      },
    ],
  },
  {
    id: 'landingPages',
    label: 'Landing Pages',
    skills: [
      {
        id: 'desenvolvimento',
        label: 'Desenvolvimento',
        subSkills: [
          { id: 'htmlCssBasico', label: 'HTML/CSS Básico', questionPath: 'landingPages.desenvolvimento.htmlCssBasico' },
          { id: 'wordpress', label: 'WordPress', questionPath: 'landingPages.desenvolvimento.wordpress' },
          { id: 'elementorWpBakery', label: 'Elementor/WP Bakery', questionPath: 'landingPages.desenvolvimento.elementorWpBakery' },
          { id: 'unbounce', label: 'Unbounce', questionPath: 'landingPages.desenvolvimento.unbounce' },
          { id: 'leadpages', label: 'Leadpages', questionPath: 'landingPages.desenvolvimento.leadpages' },
          { id: 'webflow', label: 'Webflow', questionPath: 'landingPages.desenvolvimento.webflow' },
          { id: 'rdStationHubSpot', label: 'RD Station/HubSpot', questionPath: 'landingPages.desenvolvimento.rdStationHubSpot' },
        ],
      },
      {
        id: 'otimizacao',
        label: 'Otimização',
        subSkills: [
          { id: 'uxUiConversao', label: 'UX/UI para Conversão', questionPath: 'landingPages.otimizacao.uxUiConversao' },
          { id: 'testesAb', label: 'Testes A/B', questionPath: 'landingPages.otimizacao.testesAb' },
          { id: 'otimizacaoFormularios', label: 'Otimização de Formulários', questionPath: 'landingPages.otimizacao.otimizacaoFormularios' },
          { id: 'copywritingLandingPages', label: 'Copywriting para Landing Pages', questionPath: 'landingPages.otimizacao.copywritingLandingPages' },
          { id: 'analiseHeatmaps', label: 'Análise de Heatmaps', questionPath: 'landingPages.otimizacao.analiseHeatmaps' },
          { id: 'pageSpeedOptimization', label: 'Page Speed Optimization', questionPath: 'landingPages.otimizacao.pageSpeedOptimization' },
          { id: 'mobileResponsiveness', label: 'Mobile Responsiveness', questionPath: 'landingPages.otimizacao.mobileResponsiveness' },
        ],
      },
      {
        id: 'integracoes',
        label: 'Integrações',
        subSkills: [
          { id: 'googleAnalytics', label: 'Google Analytics', questionPath: 'landingPages.integracoes.googleAnalytics' },
          { id: 'googleTagManager', label: 'Google Tag Manager', questionPath: 'landingPages.integracoes.googleTagManager' },
          { id: 'pixelFacebookMeta', label: 'Pixel Facebook/Meta', questionPath: 'landingPages.integracoes.pixelFacebookMeta' },
          { id: 'crm', label: 'CRM', questionPath: 'landingPages.integracoes.crm' },
          { id: 'ferramentasAutomacao', label: 'Ferramentas de Automação', questionPath: 'landingPages.integracoes.ferramentasAutomacao' },
        ],
      },
    ],
  },
  {
    id: 'publicidade',
    label: 'Publicidade',
    skills: [
      {
        id: 'midiaPaga',
        label: 'Mídia Paga',
        subSkills: [
          { id: 'googleAds', label: 'Google Ads', questionPath: 'publicidade.midiaPaga.googleAds' },
          { id: 'metaAds', label: 'Meta Ads', questionPath: 'publicidade.midiaPaga.metaAds' },
          { id: 'linkedinAds', label: 'LinkedIn Ads', questionPath: 'publicidade.midiaPaga.linkedinAds' },
          { id: 'tiktokAds', label: 'TikTok Ads', questionPath: 'publicidade.midiaPaga.tiktokAds' },
          { id: 'pinterestAds', label: 'Pinterest Ads', questionPath: 'publicidade.midiaPaga.pinterestAds' },
          { id: 'programatica', label: 'Programática', questionPath: 'publicidade.midiaPaga.programatica' },
        ],
      },
      {
        id: 'estrategia',
        label: 'Estratégia',
        subSkills: [
          { id: 'definicaoPublicoAlvo', label: 'Definição de Público-Alvo', questionPath: 'publicidade.estrategia.definicaoPublicoAlvo' },
          { id: 'segmentacaoAvancada', label: 'Segmentação Avançada', questionPath: 'publicidade.estrategia.segmentacaoAvancada' },
          { id: 'budgetLances', label: 'Budget e Lances', questionPath: 'publicidade.estrategia.budgetLances' },
          { id: 'funisConversao', label: 'Funis de Conversão', questionPath: 'publicidade.estrategia.funisConversao' },
          { id: 'remarketingRetargeting', label: 'Remarketing/Retargeting', questionPath: 'publicidade.estrategia.remarketingRetargeting' },
          { id: 'analiseRoiRoas', label: 'Análise de ROI/ROAS', questionPath: 'publicidade.estrategia.analiseRoiRoas' },
        ],
      },
      {
        id: 'creative',
        label: 'Creative',
        subSkills: [
          { id: 'criacaoAnuncios', label: 'Criação de Anúncios', questionPath: 'publicidade.creative.criacaoAnuncios' },
          { id: 'testesCriativos', label: 'Testes Criativos', questionPath: 'publicidade.creative.testesCriativos' },
          { id: 'videoAds', label: 'Video Ads', questionPath: 'publicidade.creative.videoAds' },
          { id: 'carouselColecoes', label: 'Carousel/Coleções', questionPath: 'publicidade.creative.carouselColecoes' },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    skills: [
      {
        id: 'marketingDigital',
        label: 'Marketing Digital',
        subSkills: [
          { id: 'seo', label: 'SEO', questionPath: 'marketing.marketingDigital.seo' },
          { id: 'marketingConteudo', label: 'Marketing de Conteúdo', questionPath: 'marketing.marketingDigital.marketingConteudo' },
          { id: 'emailMarketing', label: 'Email Marketing', questionPath: 'marketing.marketingDigital.emailMarketing' },
          { id: 'marketingPerformance', label: 'Marketing de Performance', questionPath: 'marketing.marketingDigital.marketingPerformance' },
          { id: 'growthHacking', label: 'Growth Hacking', questionPath: 'marketing.marketingDigital.growthHacking' },
          { id: 'marketingInfluencia', label: 'Marketing de Influência', questionPath: 'marketing.marketingDigital.marketingInfluencia' },
        ],
      },
      {
        id: 'estrategia',
        label: 'Estratégia',
        subSkills: [
          { id: 'planejamentoEstrategico', label: 'Planejamento Estratégico', questionPath: 'marketing.estrategia.planejamentoEstrategico' },
          { id: 'definicaoKpis', label: 'Definição de KPIs', questionPath: 'marketing.estrategia.definicaoKpis' },
          { id: 'analiseMercado', label: 'Análise de Mercado', questionPath: 'marketing.estrategia.analiseMercado' },
          { id: 'buyerPersonas', label: 'Buyer Personas', questionPath: 'marketing.estrategia.buyerPersonas' },
          { id: 'funilVendas', label: 'Funil de Vendas', questionPath: 'marketing.estrategia.funilVendas' },
          { id: 'customerJourneyMapping', label: 'Customer Journey Mapping', questionPath: 'marketing.estrategia.customerJourneyMapping' },
        ],
      },
      {
        id: 'analiseDados',
        label: 'Análise de Dados',
        subSkills: [
          { id: 'googleAnalyticsGa4', label: 'Google Analytics (GA4)', questionPath: 'marketing.analiseDados.googleAnalyticsGa4' },
          { id: 'googleSearchConsole', label: 'Google Search Console', questionPath: 'marketing.analiseDados.googleSearchConsole' },
          { id: 'dataStudioLookerStudio', label: 'Data Studio/Looker Studio', questionPath: 'marketing.analiseDados.dataStudioLookerStudio' },
          { id: 'excelGoogleSheetsAvancado', label: 'Excel/Google Sheets Avançado', questionPath: 'marketing.analiseDados.excelGoogleSheetsAvancado' },
          { id: 'interpretacaoMetricas', label: 'Interpretação de Métricas', questionPath: 'marketing.analiseDados.interpretacaoMetricas' },
          { id: 'relatoriosPerformance', label: 'Relatórios de Performance', questionPath: 'marketing.analiseDados.relatoriosPerformance' },
        ],
      },
      {
        id: 'automacao',
        label: 'Automação',
        subSkills: [
          { id: 'rdStation', label: 'RD Station', questionPath: 'marketing.automacao.rdStation' },
          { id: 'hubSpot', label: 'HubSpot', questionPath: 'marketing.automacao.hubSpot' },
          { id: 'mailchimp', label: 'Mailchimp', questionPath: 'marketing.automacao.mailchimp' },
          { id: 'activeCampaign', label: 'ActiveCampaign', questionPath: 'marketing.automacao.activeCampaign' },
          { id: 'zapierMake', label: 'Zapier/Make', questionPath: 'marketing.automacao.zapierMake' },
        ],
      },
    ],
  },
  {
    id: 'softSkills',
    label: 'Soft Skills',
    skills: [
      {
        id: 'softSkillsGeral',
        label: 'Competências Comportamentais',
        subSkills: [
          { id: 'criatividade', label: 'Criatividade', questionPath: 'softSkills.criatividade' },
          { id: 'comunicacao', label: 'Comunicação', questionPath: 'softSkills.comunicacao' },
          { id: 'trabalhoEmEquipe', label: 'Trabalho em Equipe', questionPath: 'softSkills.trabalhoEmEquipe' },
          { id: 'gestaoDeTempo', label: 'Gestão de Tempo', questionPath: 'softSkills.gestaoDeTempo' },
          { id: 'proatividade', label: 'Proatividade', questionPath: 'softSkills.proatividade' },
          { id: 'resolucaoDeProblemas', label: 'Resolução de Problemas', questionPath: 'softSkills.resolucaoDeProblemas' },
          { id: 'adaptabilidade', label: 'Adaptabilidade', questionPath: 'softSkills.adaptabilidade' },
          { id: 'atencaoAosDetalhes', label: 'Atenção aos Detalhes', questionPath: 'softSkills.atencaoAosDetalhes' },
          { id: 'sensoDeUrgencia', label: 'Senso de Urgência', questionPath: 'softSkills.sensoDeUrgencia' },
          { id: 'capacidadeAnalitica', label: 'Capacidade Analítica', questionPath: 'softSkills.capacidadeAnalitica' },
        ],
      },
    ],
  },
];

// Função auxiliar para obter classificação de nível
export function getLevelClassification(avgScore: number): {
  level: number;
  label: string;
  color: string;
  bgColor: string;
} {
  if (avgScore >= 5.0) {
    return {
      level: 5,
      label: 'Especialista/Expert',
      color: 'text-purple-800',
      bgColor: 'bg-purple-100 border-purple-200',
    };
  }
  if (avgScore >= 4.0) {
    return {
      level: 4,
      label: 'Conhecimento Avançado',
      color: 'text-green-800',
      bgColor: 'bg-green-100 border-green-200',
    };
  }
  if (avgScore >= 3.0) {
    return {
      level: 3,
      label: 'Conhecimento Intermediário',
      color: 'text-yellow-800',
      bgColor: 'bg-yellow-100 border-yellow-200',
    };
  }
  if (avgScore >= 2.0) {
    return {
      level: 2,
      label: 'Conhecimento Básico',
      color: 'text-orange-800',
      bgColor: 'bg-orange-100 border-orange-200',
    };
  }
  return {
    level: 1,
    label: 'Sem Conhecimento',
    color: 'text-red-800',
    bgColor: 'bg-red-100 border-red-200',
  };
}

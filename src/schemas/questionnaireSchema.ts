import { z } from "zod";

const sliderSchema = z.coerce.number().min(1, { message: "O nível deve ser entre 1 e 5." }).max(5, { message: "O nível deve ser entre 1 e 5." }).default(1);

export const questionnaireSchema = z.object({
  // 1. BRANDING & REBRANDING
  brandingRebranding: z.object({
    estrategiaDeMarca: z.object({
      desenvolvimentoIdentidadeVisual: sliderSchema,
      criacaoNamingTaglines: sliderSchema,
      arquiteturaMarca: sliderSchema,
      posicionamentoEstrategico: sliderSchema,
      brandGuidelinesManuais: sliderSchema,
      pesquisaMercadoPersonas: sliderSchema,
      analiseConcorrencia: sliderSchema,
    }),
    rebranding: z.object({
      auditoriaMarcaExistente: sliderSchema,
      estrategiaTransicaoMarca: sliderSchema,
      gestaoMudancaOrganizacional: sliderSchema,
      comunicacaoRebranding: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 2. COPYWRITING
  copywriting: z.object({
    tecnicasDeEscrita: z.object({
      headlinesTitulosPersuasivos: sliderSchema,
      callToActionEfetivos: sliderSchema,
      storytellingComercial: sliderSchema,
      copywritingConversao: sliderSchema,
      seoCopywriting: sliderSchema,
      microcopyUxWriting: sliderSchema,
    }),
    formatos: z.object({
      anunciosPagos: sliderSchema,
      emailMarketing: sliderSchema,
      scriptsVideo: sliderSchema,
      copyRedesSociais: sliderSchema,
      salesPages: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 3. REDAÇÃO
  redacao: z.object({
    conteudoEditorial: z.object({
      artigosBlogSeo: sliderSchema,
      pressReleases: sliderSchema,
      casosEstudo: sliderSchema,
      ebooksWhitepapers: sliderSchema,
      newsletters: sliderSchema,
      roteirosScripts: sliderSchema,
    }),
    tomVoz: z.object({
      adaptacaoLinguagemPublico: sliderSchema,
      redacaoTecnica: sliderSchema,
      redacaoCriativa: sliderSchema,
      revisaoEdicaoTextos: sliderSchema,
      gramaticaOrtografiaPtBr: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 4. ARTE & DESIGN
  arteDesign: z.object({
    designGrafico: z.object({
      adobePhotoshop: sliderSchema,
      adobeIllustrator: sliderSchema,
      adobeInDesign: sliderSchema,
      figma: sliderSchema,
      canvaPro: sliderSchema,
      corelDRAW: sliderSchema,
    }),
    habilidadesCriativas: z.object({
      teoriaCores: sliderSchema,
      tipografia: sliderSchema,
      composicaoVisual: sliderSchema,
      ilustracaoDigital: sliderSchema,
      manipulacaoImagens: sliderSchema,
      motionGraphicsBasico: sliderSchema,
      designApresentacoes: sliderSchema,
    }),
    materiais: z.object({
      pecasRedesSociais: sliderSchema,
      bannersOutdoors: sliderSchema,
      materiaisImpressos: sliderSchema,
      embalagens: sliderSchema,
      identidadeVisualCompleta: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 5. MÍDIA SOCIAL (SOCIAL MEDIA)
  midiaSocial: z.object({
    plataformas: z.object({
      instagram: sliderSchema,
      facebook: sliderSchema,
      linkedin: sliderSchema,
      tiktok: sliderSchema,
      youtube: sliderSchema,
      twitterX: sliderSchema,
      pinterest: sliderSchema,
    }),
    gestao: z.object({
      planejamentoConteudo: sliderSchema,
      calendarioEditorial: sliderSchema,
      analiseMetricasKpis: sliderSchema,
      gerenciamentoComunidade: sliderSchema,
      atendimentoCliente: sliderSchema,
      gestaoCrises: sliderSchema,
    }),
    ferramentas: z.object({
      metaBusinessSuite: sliderSchema,
      hootsuiteBuffer: sliderSchema,
      sproutSocial: sliderSchema,
      laterPlanable: sliderSchema,
      analiseNativaPlataformas: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 6. LANDING PAGES
  landingPages: z.object({
    desenvolvimento: z.object({
      htmlCssBasico: sliderSchema,
      wordpress: sliderSchema,
      elementorWpBakery: sliderSchema,
      unbounce: sliderSchema,
      leadpages: sliderSchema,
      webflow: sliderSchema,
      rdStationHubSpot: sliderSchema,
    }),
    otimizacao: z.object({
      uxUiConversao: sliderSchema,
      testesAb: sliderSchema,
      otimizacaoFormularios: sliderSchema,
      copywritingLandingPages: sliderSchema,
      analiseHeatmaps: sliderSchema,
      pageSpeedOptimization: sliderSchema,
      mobileResponsiveness: sliderSchema,
    }),
    integracoes: z.object({
      googleAnalytics: sliderSchema,
      googleTagManager: sliderSchema,
      pixelFacebookMeta: sliderSchema,
      crm: sliderSchema,
      ferramentasAutomacao: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 7. PUBLICIDADE
  publicidade: z.object({
    midiaPaga: z.object({
      googleAds: sliderSchema,
      metaAds: sliderSchema,
      linkedinAds: sliderSchema,
      tiktokAds: sliderSchema,
      pinterestAds: sliderSchema,
      programatica: sliderSchema,
    }),
    estrategia: z.object({
      definicaoPublicoAlvo: sliderSchema,
      segmentacaoAvancada: sliderSchema,
      budgetLances: sliderSchema,
      funisConversao: sliderSchema,
      remarketingRetargeting: sliderSchema,
      analiseRoiRoas: sliderSchema,
    }),
    creative: z.object({
      criacaoAnuncios: sliderSchema,
      testesCriativos: sliderSchema,
      videoAds: sliderSchema,
      carouselColecoes: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 8. MARKETING
  marketing: z.object({
    marketingDigital: z.object({
      seo: sliderSchema,
      marketingConteudo: sliderSchema,
      emailMarketing: sliderSchema,
      marketingPerformance: sliderSchema,
      growthHacking: sliderSchema,
      marketingInfluencia: sliderSchema,
    }),
    estrategia: z.object({
      planejamentoEstrategico: sliderSchema,
      definicaoKpis: sliderSchema,
      analiseMercado: sliderSchema,
      buyerPersonas: sliderSchema,
      funilVendas: sliderSchema,
      customerJourneyMapping: sliderSchema,
    }),
    analiseDados: z.object({
      googleAnalyticsGa4: sliderSchema,
      googleSearchConsole: sliderSchema,
      dataStudioLookerStudio: sliderSchema,
      excelGoogleSheetsAvancado: sliderSchema,
      interpretacaoMetricas: sliderSchema,
      relatoriosPerformance: sliderSchema,
    }),
    automacao: z.object({
      rdStation: sliderSchema,
      hubSpot: sliderSchema,
      mailchimp: sliderSchema,
      activeCampaign: sliderSchema,
      zapierMake: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 9. TECNOLOGIA & AUTOMAÇÕES
  tecnologiaAutomacoes: z.object({
    infraestruturaTecnologica: z.object({
      dominiosDns: sliderSchema,
      hospedagemWeb: sliderSchema,
      servidoresCloudComputing: sliderSchema,
      sslCertificadosSeguranca: sliderSchema,
      cdn: sliderSchema,
      backupRecuperacaoDados: sliderSchema,
    }),
    desenvolvimentoWeb: z.object({
      htmlCss3: sliderSchema,
      javaScriptBasico: sliderSchema,
      wordpressInstalacaoConfiguracao: sliderSchema,
      pluginsEssenciaisWordpress: sliderSchema,
      phpBasico: sliderSchema,
      apisIntegracoes: sliderSchema,
      versionamentoGitGithub: sliderSchema,
      responsiveDesign: sliderSchema,
    }),
    cmsPlataformas: z.object({
      wordpress: sliderSchema,
      webflow: sliderSchema,
      shopify: sliderSchema,
      wixSquarespace: sliderSchema,
      drupalJoomla: sliderSchema,
      headlessCms: sliderSchema,
    }),
    automacaoMarketing: z.object({
      rdStationMarketing: sliderSchema,
      hubSpotWorkflows: sliderSchema,
      activeCampaignAutomacoes: sliderSchema,
      mailchimpCustomerJourneys: sliderSchema,
      klaviyoEcommerceAutomation: sliderSchema,
      marketingCloudSalesforce: sliderSchema,
    }),
    automacaoProcessosNoCodeLowCode: z.object({
      zapier: sliderSchema,
      makeIntegromat: sliderSchema,
      n8n: sliderSchema,
      pabblyConnect: sliderSchema,
      automateIo: sliderSchema,
      microsoftPowerAutomate: sliderSchema,
      ifttt: sliderSchema,
    }),
    automacaoRedesSociais: z.object({
      agendamentoAutomatico: sliderSchema,
      chatbotsInstagramFacebook: sliderSchema,
      manyChat: sliderSchema,
      chatfuel: sliderSchema,
      respostaAutomaticaDm: sliderSchema,
      automacaoStoriesPosts: sliderSchema,
    }),
    crmGestaoClientes: z.object({
      hubSpotCrm: sliderSchema,
      rdStationCrm: sliderSchema,
      salesforce: sliderSchema,
      pipedrive: sliderSchema,
      bitrix24: sliderSchema,
      zohoCrm: sliderSchema,
      mondaySalesCrm: sliderSchema,
    }),
    automacaoWhatsappBusiness: z.object({
      whatsappBusinessApi: sliderSchema,
      chatbotsWhatsapp: sliderSchema,
      integracaoCrm: sliderSchema,
      disparosMassa: sliderSchema,
      automacaoAtendimento: sliderSchema,
      plataformasTwilioZenviaTakeBlip: sliderSchema,
    }),
    iaFerramentasInteligentes: z.object({
      chatGptClaude: sliderSchema,
      midjourneyDallE: sliderSchema,
      jasperAi: sliderSchema,
      copyAi: sliderSchema,
      runwayMl: sliderSchema,
      removeBg: sliderSchema,
      grammarly: sliderSchema,
      iaAnaliseDados: sliderSchema,
    }),
    automacaoRelatorios: z.object({
      googleDataStudioLookerStudio: sliderSchema,
      powerBi: sliderSchema,
      tableau: sliderSchema,
      dashboardsAutomaticos: sliderSchema,
      integracaoMultiplasFontesDados: sliderSchema,
      relatoriosAgendadosAutomaticamente: sliderSchema,
      googleSheetsScripts: sliderSchema,
    }),
    ferramentasColaboracao: z.object({
      slack: sliderSchema,
      microsoftTeams: sliderSchema,
      discord: sliderSchema,
      notionBaseConhecimento: sliderSchema,
      googleWorkspace: sliderSchema,
      asanaTrelloMonday: sliderSchema,
    }),
    ecommercePagamentos: z.object({
      integracaoGatewaysPagamento: sliderSchema,
      stripe: sliderSchema,
      paypal: sliderSchema,
      mercadoPago: sliderSchema,
      pagSeguro: sliderSchema,
      automacaoCarrinhoAbandonado: sliderSchema,
      upsellCrossSellAutomatizados: sliderSchema,
    }),
    automacaoEmail: z.object({
      sequenciasNutricao: sliderSchema,
      segmentacaoDinamica: sliderSchema,
      triggersComportamentais: sliderSchema,
      abTestingAutomatizado: sliderSchema,
      reEngajamentoAutomatico: sliderSchema,
      integracaoEventosSite: sliderSchema,
    }),
    ferramentasProdutividade: z.object({
      loom: sliderSchema,
      calendly: sliderSchema,
      typeformGoogleForms: sliderSchema,
      docusignAssinaturasDigitais: sliderSchema,
      notionCodaDocumentacao: sliderSchema,
      airtableBancoDadosVisual: sliderSchema,
    }),
    seoTecnicoFerramentas: z.object({
      googleSearchConsole: sliderSchema,
      semrushAhrefs: sliderSchema,
      screamingFrog: sliderSchema,
      schemaMarkup: sliderSchema,
      sitemapXml: sliderSchema,
      robotsTxt: sliderSchema,
      coreWebVitals: sliderSchema,
    }),
    segurancaCompliance: z.object({
      lgpd: sliderSchema,
      cookiesConsentimento: sliderSchema,
      politicasPrivacidade: sliderSchema,
      segurancaDadosClientes: sliderSchema,
      autenticacaoDoisFatores: sliderSchema,
      firewallProtecaoMalware: sliderSchema,
    }),
    analyticsTagManagement: z.object({
      googleAnalytics4: sliderSchema,
      googleTagManager: sliderSchema,
      facebookPixel: sliderSchema,
      hotjarCrazyEgg: sliderSchema,
      mixpanel: sliderSchema,
      configuracaoEventosCustomizados: sliderSchema,
    }),
    automacaoPropostasContratos: z.object({
      pandadoc: sliderSchema,
      proposify: sliderSchema,
      docusign: sliderSchema,
      hellosign: sliderSchema,
      templatesAutomatizados: sliderSchema,
      followUpAutomaticoPropostas: sliderSchema,
    }),
    gestaoFinanceiraAutomatizada: z.object({
      integracaoBancaria: sliderSchema,
      emissaoNotasFiscaisAutomaticas: sliderSchema,
      cobrancasRecorrentes: sliderSchema,
      controleFluxoCaixa: sliderSchema,
      ferramentasContaAzulOmieBling: sliderSchema,
    }),
    backupRecuperacao: z.object({
      backupAutomaticoSites: sliderSchema,
      backupDadosCrm: sliderSchema,
      versionamentoArquivos: sliderSchema,
      planoDisasterRecovery: sliderSchema,
      cloudBackup: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 10. HABILIDADES COMPLEMENTARES
  habilidadesComplementares: z.object({
    gestaoProjetos: z.object({
      metodologiasAgeis: sliderSchema,
      trelloAsanaMonday: sliderSchema,
      gestaoPrazos: sliderSchema,
      briefingDebriefing: sliderSchema,
      gestaoEquipe: sliderSchema,
    }),
    atendimentoCliente: z.object({
      relacionamentoCliente: sliderSchema,
      apresentacoesComerciais: sliderSchema,
      negociacao: sliderSchema,
      propostasComerciais: sliderSchema,
    }),
    outrasSkills: z.object({
      fotografiaBasica: sliderSchema,
      edicaoVideo: sliderSchema,
      producaoAudiovisual: sliderSchema,
      audioPodcast: sliderSchema,
      nocoesProgramacao: sliderSchema,
    }),
    // nivelGeral removido
  }),

  // 11. SOFT SKILLS (Já eram sliders, mas garantindo o schema)
  softSkills: z.object({
    criatividade: sliderSchema,
    comunicacao: sliderSchema,
    trabalhoEmEquipe: sliderSchema,
    gestaoDeTempo: sliderSchema,
    proatividade: sliderSchema,
    resolucaoDeProblemas: sliderSchema,
    adaptabilidade: sliderSchema,
    atencaoAosDetalhes: sliderSchema,
    sensoDeUrgencia: sliderSchema,
    capacidadeAnalitica: sliderSchema,
    // nivelGeral removido
  }),
});

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>;
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { questionnaireSchema, QuestionnaireSchema } from "@/schemas/questionnaireSchema";

// Import all step components
import BrandingRebrandingStep from "@/components/form-steps/BrandingRebrandingStep";
import CopywritingStep from "@/components/form-steps/CopywritingStep";
import RedacaoStep from "@/components/form-steps/RedacaoStep";
import ArteDesignStep from "@/components/form-steps/ArteDesignStep";
import MidiaSocialStep from "@/components/form-steps/MidiaSocialStep";
import LandingPagesStep from "@/components/form-steps/LandingPagesStep";
import PublicidadeStep from "@/components/form-steps/PublicidadeStep";
import MarketingStep from "@/components/form-steps/MarketingStep";
import TecnologiaAutomacoesStep from "@/components/form-steps/TecnologiaAutomacoesStep";
import HabilidadesComplementaresStep from "@/components/form-steps/HabilidadesComplementaresStep";
import SoftSkillsStep from "@/components/form-steps/SoftSkillsStep";
import SummaryStep from "@/components/form-steps/SummaryStep";

const steps = [
  { id: "branding", name: "Branding & Rebranding", component: BrandingRebrandingStep },
  { id: "copywriting", name: "Copywriting", component: CopywritingStep },
  { id: "redacao", name: "Redação", component: RedacaoStep },
  { id: "arteDesign", name: "Arte & Design", component: ArteDesignStep },
  { id: "midiaSocial", name: "Mídia Social", component: MidiaSocialStep },
  { id: "landingPages", name: "Landing Pages", component: LandingPagesStep },
  { id: "publicidade", name: "Publicidade", component: PublicidadeStep },
  { id: "marketing", name: "Marketing", component: MarketingStep },
  { id: "tecnologiaAutomacoes", name: "Tecnologia & Automações", component: TecnologiaAutomacoesStep },
  { id: "habilidadesComplementares", name: "Habilidades Complementares", component: HabilidadesComplementaresStep },
  { id: "softSkills", name: "Soft Skills", component: SoftSkillsStep },
  { id: "summary", name: "Resumo", component: SummaryStep },
];

const MultiStepQuestionnaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<QuestionnaireSchema>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      // Default values for all fields as per schema
      brandingRebranding: {
        estrategiaDeMarca: {
          desenvolvimentoIdentidadeVisual: false, criacaoNamingTaglines: false, arquiteturaMarca: false,
          posicionamentoEstrategico: false, brandGuidelinesManuais: false, pesquisaMercadoPersonas: false,
          analiseConcorrencia: false,
        },
        rebranding: {
          auditoriaMarcaExistente: false, estrategiaTransicaoMarca: false, gestaoMudancaOrganizacional: false,
          comunicacaoRebranding: false,
        },
      },
      copywriting: {
        tecnicasDeEscrita: {
          headlinesTitulosPersuasivos: false, callToActionEfetivos: false, storytellingComercial: false,
          copywritingConversao: false, seoCopywriting: false, microcopyUxWriting: false,
        },
        formatos: {
          anunciosPagos: false, emailMarketing: false, scriptsVideo: false,
          copyRedesSociais: false, salesPages: false,
        },
        nivelGeral: 1,
      },
      redacao: {
        conteudoEditorial: {
          artigosBlogSeo: false, pressReleases: false, casosEstudo: false,
          ebooksWhitepapers: false, newsletters: false, roteirosScripts: false,
        },
        tomVoz: {
          adaptacaoLinguagemPublico: false, redacaoTecnica: false, redacaoCriativa: false,
          revisaoEdicaoTextos: false, gramaticaOrtografiaPtBr: false,
        },
        nivelGeral: 1,
      },
      arteDesign: {
        designGrafico: {
          adobePhotoshop: false, adobeIllustrator: false, adobeInDesign: false,
          figma: false, canvaPro: false, corelDRAW: false,
        },
        habilidadesCriativas: {
          teoriaCores: false, tipografia: false, composicaoVisual: false,
          ilustracaoDigital: false, manipulacaoImagens: false, motionGraphicsBasico: false,
          designApresentacoes: false,
        },
        materiais: {
          pecasRedesSociais: false, bannersOutdoors: false, materiaisImpressos: false,
          embalagens: false, identidadeVisualCompleta: false,
        },
        nivelGeral: 1,
      },
      midiaSocial: {
        plataformas: {
          instagram: false, facebook: false, linkedin: false,
          tiktok: false, youtube: false, twitterX: false,
          pinterest: false,
        },
        gestao: {
          planejamentoConteudo: false, calendarioEditorial: false, analiseMetricasKpis: false,
          gerenciamentoComunidade: false, atendimentoCliente: false, gestaoCrises: false,
        },
        ferramentas: {
          metaBusinessSuite: false, hootsuiteBuffer: false, sproutSocial: false,
          laterPlanable: false, analiseNativaPlataformas: false,
        },
        nivelGeral: 1,
      },
      landingPages: {
        desenvolvimento: {
          htmlCssBasico: false, wordpress: false, elementorWpBakery: false,
          unbounce: false, leadpages: false, webflow: false,
          rdStationHubSpot: false,
        },
        otimizacao: {
          uxUiConversao: false, testesAb: false, otimizacaoFormularios: false,
          copywritingLandingPages: false, analiseHeatmaps: false, pageSpeedOptimization: false,
          mobileResponsiveness: false,
        },
        integracoes: {
          googleAnalytics: false, googleTagManager: false, pixelFacebookMeta: false,
          crm: false, ferramentasAutomacao: false,
        },
        nivelGeral: 1,
      },
      publicidade: {
        midiaPaga: {
          googleAds: false, metaAds: false, linkedinAds: false,
          tiktokAds: false, pinterestAds: false, programatica: false,
        },
        estrategia: {
          definicaoPublicoAlvo: false, segmentacaoAvancada: false, budgetLances: false,
          funisConversao: false, remarketingRetargeting: false, analiseRoiRoas: false,
        },
        creative: {
          criacaoAnuncios: false, testesCriativos: false, videoAds: false,
          carouselColecoes: false,
        },
        nivelGeral: 1,
      },
      marketing: {
        marketingDigital: {
          seo: false, marketingConteudo: false, emailMarketing: false,
          marketingPerformance: false, growthHacking: false, marketingInfluencia: false,
        },
        estrategia: {
          planejamentoEstrategico: false, definicaoKpis: false, analiseMercado: false,
          buyerPersonas: false, funilVendas: false, customerJourneyMapping: false,
        },
        analiseDados: {
          googleAnalyticsGa4: false, googleSearchConsole: false, dataStudioLookerStudio: false,
          excelGoogleSheetsAvancado: false, interpretacaoMetricas: false, relatoriosPerformance: false,
        },
        automacao: {
          rdStation: false, hubSpot: false, mailchimp: false,
          activeCampaign: false, zapierMake: false,
        },
        nivelGeral: 1,
      },
      tecnologiaAutomacoes: {
        infraestruturaTecnologica: {
          dominiosDns: false, hospedagemWeb: false, servidoresCloudComputing: false,
          sslCertificadosSeguranca: false, cdn: false, backupRecuperacaoDados: false,
        },
        desenvolvimentoWeb: {
          htmlCss3: false, javaScriptBasico: false, wordpressInstalacaoConfiguracao: false,
          pluginsEssenciaisWordpress: false, phpBasico: false, apisIntegracoes: false,
          versionamentoGitGithub: false, responsiveDesign: false,
        },
        cmsPlataformas: {
          wordpress: false, webflow: false, shopify: false,
          wixSquarespace: false, drupalJoomla: false, headlessCms: false,
        },
        automacaoMarketing: {
          rdStationMarketing: false, hubSpotWorkflows: false, activeCampaignAutomacoes: false,
          mailchimpCustomerJourneys: false, klaviyoEcommerceAutomation: false, marketingCloudSalesforce: false,
        },
        automacaoProcessosNoCodeLowCode: {
          zapier: false, makeIntegromat: false, n8n: false,
          pabblyConnect: false, automateIo: false, microsoftPowerAutomate: false,
          ifttt: false,
        },
        automacaoRedesSociais: {
          agendamentoAutomatico: false, chatbotsInstagramFacebook: false, manyChat: false,
          chatfuel: false, respostaAutomaticaDm: false, automacaoStoriesPosts: false,
        },
        crmGestaoClientes: {
          hubSpotCrm: false, rdStationCrm: false, salesforce: false,
          pipedrive: false, bitrix24: false, zohoCrm: false,
          mondaySalesCrm: false,
        },
        automacaoWhatsappBusiness: {
          whatsappBusinessApi: false, chatbotsWhatsapp: false, integracaoCrm: false,
          disparosMassa: false, automacaoAtendimento: false, plataformasTwilioZenviaTakeBlip: false,
        },
        iaFerramentasInteligentes: {
          chatGptClaude: false, midjourneyDallE: false, jasperAi: false,
          copyAi: false, runwayMl: false, removeBg: false,
          grammarly: false, iaAnaliseDados: false,
        },
        automacaoRelatorios: {
          googleDataStudioLookerStudio: false, powerBi: false, tableau: false,
          dashboardsAutomaticos: false, integracaoMultiplasFontesDados: false, relatoriosAgendadosAutomaticamente: false,
          googleSheetsScripts: false,
        },
        ferramentasColaboracao: {
          slack: false, microsoftTeams: false, discord: false,
          notionBaseConhecimento: false, googleWorkspace: false, asanaTrelloMonday: false,
        },
        ecommercePagamentos: {
          integracaoGatewaysPagamento: false, stripe: false, paypal: false,
          mercadoPago: false, pagSeguro: false, automacaoCarrinhoAbandonado: false,
          upsellCrossSellAutomatizados: false,
        },
        automacaoEmail: {
          sequenciasNutricao: false, segmentacaoDinamica: false, triggersComportamentais: false,
          abTestingAutomatizado: false, reEngajamentoAutomatico: false, integracaoEventosSite: false,
        },
        ferramentasProdutividade: {
          loom: false, calendly: false, typeformGoogleForms: false,
          docusignAssinaturasDigitais: false, notionCodaDocumentacao: false, airtableBancoDadosVisual: false,
        },
        seoTecnicoFerramentas: {
          googleSearchConsole: false, semrushAhrefs: false, screamingFrog: false,
          schemaMarkup: false, sitemapXml: false, robotsTxt: false,
          coreWebVitals: false,
        },
        segurancaCompliance: {
          lgpd: false, cookiesConsentimento: false, politicasPrivacidade: false,
          segurancaDadosClientes: false, autenticacaoDoisFatores: false, firewallProtecaoMalware: false,
        },
        analyticsTagManagement: {
          googleAnalytics4: false, googleTagManager: false, facebookPixel: false,
          hotjarCrazyEgg: false, mixpanel: false, configuracaoEventosCustomizados: false,
        },
        automacaoPropostasContratos: {
          pandadoc: false, proposify: false, docusign: false,
          hellosign: false, templatesAutomatizados: false, followUpAutomaticoPropostas: false,
        },
        gestaoFinanceiraAutomatizada: {
          integracaoBancaria: false, emissaoNotasFiscaisAutomaticas: false, cobrancasRecorrentes: false,
          controleFluxoCaixa: false, ferramentasContaAzulOmieBling: false,
        },
        backupRecuperacao: {
          backupAutomaticoSites: false, backupDadosCrm: false, versionamentoArquivos: false,
          planoDisasterRecovery: false, cloudBackup: false,
        },
        nivelGeral: 1,
      },
      habilidadesComplementares: {
        gestaoProjetos: {
          metodologiasAgeis: false, trelloAsanaMonday: false, gestaoPrazos: false,
          briefingDebriefing: false, gestaoEquipe: false,
        },
        atendimentoCliente: {
          relacionamentoCliente: false, apresentacoesComerciais: false, negociacao: false,
          propostasComerciais: false,
        },
        outrasSkills: {
          fotografiaBasica: false, edicaoVideo: false, producaoAudiovisual: false,
          audioPodcast: false, nocoesProgramacao: false,
        },
        nivelGeral: 1,
      },
      softSkills: {
        criatividade: 1, comunicacao: 1, trabalhoEmEquipe: 1,
        gestaoDeTempo: 1, proatividade: 1, resolucaoDeProblemas: 1,
        adaptabilidade: 1, atencaoAosDetalhes: 1, sensoDeUrgencia: 1,
        capacidadeAnalitica: 1, nivelGeral: 1,
      },
    },
  });

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = async () => {
    const currentStepId = steps[currentStep].id;
    const isValid = await methods.trigger(currentStepId as keyof QuestionnaireSchema);

    if (isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // This is the final step (Summary), so submit the form
        methods.handleSubmit(onSubmit)();
      }
    } else {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: QuestionnaireSchema) => {
    console.log("Formulário Completo:", data);
    toast({
      title: "Questionário enviado com sucesso!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // Aqui você pode enviar os dados para um backend ou processá-los
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6 p-4">
        <Progress value={progress} className="w-full h-2 bg-inclusive-purple/20 [&>div]:bg-inclusive-purple" />
        <div className="text-center text-sm text-muted-foreground">
          Etapa {currentStep + 1} de {totalSteps}: {steps[currentStep].name}
        </div>

        <CurrentStepComponent />

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-inclusive-blue"
            >
              Voltar
            </Button>
          )}
          <Button
            type={currentStep === totalSteps - 1 ? "submit" : "button"}
            onClick={handleNext}
            className="ml-auto bg-inclusive-orange text-inclusive-orange-foreground hover:bg-inclusive-orange/90"
          >
            {currentStep === totalSteps - 1 ? "Finalizar Questionário" : "Próximo"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepQuestionnaire;
import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const TecnologiaAutomacoesStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            9. Tecnologia & Automações
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Tecnologia & Automações.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="9.1 Infraestrutura Tecnológica"
            pathPrefix="tecnologiaAutomacoes.infraestruturaTecnologica"
            fields={[
              { name: "dominiosDns", label: "Domínios e DNS (GoDaddy, Registro.br, Cloudflare)", ...sliderProps },
              { name: "hospedagemWeb", label: "Hospedagem web (AWS, Google Cloud, HostGator)", ...sliderProps },
              { name: "servidoresCloudComputing", label: "Servidores e cloud computing", ...sliderProps },
              { name: "sslCertificadosSeguranca", label: "SSL e certificados de segurança", ...sliderProps },
              { name: "cdn", label: "CDN (Content Delivery Network)", ...sliderProps },
              { name: "backupRecuperacaoDados", label: "Backup e recuperação de dados", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.2 Desenvolvimento Web"
            pathPrefix="tecnologiaAutomacoes.desenvolvimentoWeb"
            fields={[
              { name: "htmlCss3", label: "HTML5/CSS3", ...sliderProps },
              { name: "javaScriptBasico", label: "JavaScript básico", ...sliderProps },
              { name: "wordpressInstalacaoConfiguracao", label: "WordPress (instalação e configuração)", ...sliderProps },
              { name: "pluginsEssenciaisWordpress", label: "Plugins essenciais do WordPress", ...sliderProps },
              { name: "phpBasico", label: "PHP básico", ...sliderProps },
              { name: "apisIntegracoes", label: "APIs e integrações", ...sliderProps },
              { name: "versionamentoGitGithub", label: "Versionamento (Git/GitHub)", ...sliderProps },
              { name: "responsiveDesign", label: "Responsive design", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.3 CMS e Plataformas"
            pathPrefix="tecnologiaAutomacoes.cmsPlataformas"
            fields={[
              { name: "wordpress", label: "WordPress", ...sliderProps },
              { name: "webflow", label: "Webflow", ...sliderProps },
              { name: "shopify", label: "Shopify", ...sliderProps },
              { name: "wixSquarespace", label: "Wix/Squarespace", ...sliderProps },
              { name: "drupalJoomla", label: "Drupal/Joomla", ...sliderProps },
              { name: "headlessCms", label: "Headless CMS (Strapi, Contentful)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.4 Automação de Marketing"
            pathPrefix="tecnologiaAutomacoes.automacaoMarketing"
            fields={[
              { name: "rdStationMarketing", label: "RD Station Marketing (fluxos e automações)", ...sliderProps },
              { name: "hubSpotWorkflows", label: "HubSpot (workflows e sequences)", ...sliderProps },
              { name: "activeCampaignAutomacoes", label: "ActiveCampaign (automações de e-mail)", ...sliderProps },
              { name: "mailchimpCustomerJourneys", label: "Mailchimp (customer journeys)", ...sliderProps },
              { name: "klaviyoEcommerceAutomation", label: "Klaviyo (e-commerce automation)", ...sliderProps },
              { name: "marketingCloudSalesforce", label: "Marketing Cloud (Salesforce)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.5 Automação de Processos (No-Code/Low-Code)"
            pathPrefix="tecnologiaAutomacoes.automacaoProcessosNoCodeLowCode"
            fields={[
              { name: "zapier", label: "Zapier (integrações entre apps)", ...sliderProps },
              { name: "makeIntegromat", label: "Make (Integromat)", ...sliderProps },
              { name: "n8n", label: "n8n (automação open-source)", ...sliderProps },
              { name: "pabblyConnect", label: "Pabbly Connect", ...sliderProps },
              { name: "automateIo", label: "Automate.io", ...sliderProps },
              { name: "microsoftPowerAutomate", label: "Microsoft Power Automate", ...sliderProps },
              { name: "ifttt", label: "IFTTT", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.6 Automação de Redes Sociais"
            pathPrefix="tecnologiaAutomacoes.automacaoRedesSociais"
            fields={[
              { name: "agendamentoAutomatico", label: "Agendamento automático (Buffer, Hootsuite)", ...sliderProps },
              { name: "chatbotsInstagramFacebook", label: "Chatbots para Instagram/Facebook", ...sliderProps },
              { name: "manyChat", label: "ManyChat (automação de mensagens)", ...sliderProps },
              { name: "chatfuel", label: "Chatfuel", ...sliderProps },
              { name: "respostaAutomaticaDm", label: "Resposta automática em DM", ...sliderProps },
              { name: "automacaoStoriesPosts", label: "Automação de stories e posts", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.7 CRM e Gestão de Clientes"
            pathPrefix="tecnologiaAutomacoes.crmGestaoClientes"
            fields={[
              { name: "hubSpotCrm", label: "HubSpot CRM", ...sliderProps },
              { name: "rdStationCrm", label: "RD Station CRM", ...sliderProps },
              { name: "salesforce", label: "Salesforce", ...sliderProps },
              { name: "pipedrive", label: "Pipedrive", ...sliderProps },
              { name: "bitrix24", label: "Bitrix24", ...sliderProps },
              { name: "zohoCrm", label: "Zoho CRM", ...sliderProps },
              { name: "mondaySalesCrm", label: "Monday Sales CRM", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.8 Automação de WhatsApp Business"
            pathPrefix="tecnologiaAutomacoes.automacaoWhatsappBusiness"
            fields={[
              { name: "whatsappBusinessApi", label: "WhatsApp Business API", ...sliderProps },
              { name: "chatbotsWhatsapp", label: "Chatbots para WhatsApp", ...sliderProps },
              { name: "integracaoCrm", label: "Integração com CRM", ...sliderProps },
              { name: "disparosMassa", label: "Disparos em massa (dentro das políticas)", ...sliderProps },
              { name: "automacaoAtendimento", label: "Automação de atendimento", ...sliderProps },
              { name: "plataformasTwilioZenviaTakeBlip", label: "Plataformas: Twilio, Zenvia, Take Blip", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.9 IA e Ferramentas Inteligentes"
            pathPrefix="tecnologiaAutomacoes.iaFerramentasInteligentes"
            fields={[
              { name: "chatGptClaude", label: "ChatGPT/Claude (para copywriting e brainstorm)", ...sliderProps },
              { name: "midjourneyDallE", label: "Midjourney/DALL-E (criação de imagens)", ...sliderProps },
              { name: "jasperAi", label: "Jasper AI (copywriting)", ...sliderProps },
              { name: "copyAi", label: "Copy.ai", ...sliderProps },
              { name: "runwayMl", label: "Runway ML (edição de vídeo com IA)", ...sliderProps },
              { name: "removeBg", label: "Remove.bg (remoção de fundo)", ...sliderProps },
              { name: "grammarly", label: "Grammarly (correção de textos)", ...sliderProps },
              { name: "iaAnaliseDados", label: "IA para análise de dados", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.10 Automação de Relatórios"
            pathPrefix="tecnologiaAutomacoes.automacaoRelatorios"
            fields={[
              { name: "googleDataStudioLookerStudio", label: "Google Data Studio/Looker Studio", ...sliderProps },
              { name: "powerBi", label: "Power BI", ...sliderProps },
              { name: "tableau", label: "Tableau", ...sliderProps },
              { name: "dashboardsAutomaticos", label: "Dashboards automáticos", ...sliderProps },
              { name: "integracaoMultiplasFontesDados", label: "Integração de múltiplas fontes de dados", ...sliderProps },
              { name: "relatoriosAgendadosAutomaticamente", label: "Relatórios agendados automaticamente", ...sliderProps },
              { name: "googleSheetsScripts", label: "Google Sheets com scripts", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.11 Ferramentas de Colaboração"
            pathPrefix="tecnologiaAutomacoes.ferramentasColaboracao"
            fields={[
              { name: "slack", label: "Slack (+ integrações e bots)", ...sliderProps },
              { name: "microsoftTeams", label: "Microsoft Teams", ...sliderProps },
              { name: "discord", label: "Discord", ...sliderProps },
              { name: "notionBaseConhecimento", label: "Notion (base de conhecimento)", ...sliderProps },
              { name: "googleWorkspace", label: "Google Workspace", ...sliderProps },
              { name: "asanaTrelloMonday", label: "Asana/Trello/Monday (automações)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.12 E-commerce e Pagamentos"
            pathPrefix="tecnologiaAutomacoes.ecommercePagamentos"
            fields={[
              { name: "integracaoGatewaysPagamento", label: "Integração com gateways de pagamento", ...sliderProps },
              { name: "stripe", label: "Stripe", ...sliderProps },
              { name: "paypal", label: "PayPal", ...sliderProps },
              { name: "mercadoPago", label: "Mercado Pago", ...sliderProps },
              { name: "pagSeguro", label: "PagSeguro", ...sliderProps },
              { name: "automacaoCarrinhoAbandonado", label: "Automação de carrinho abandonado", ...sliderProps },
              { name: "upsellCrossSellAutomatizados", label: "Upsell e cross-sell automatizados", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.13 Automação de E-mail"
            pathPrefix="tecnologiaAutomacoes.automacaoEmail"
            fields={[
              { name: "sequenciasNutricao", label: "Sequências de nutrição", ...sliderProps },
              { name: "segmentacaoDinamica", label: "Segmentação dinâmica", ...sliderProps },
              { name: "triggersComportamentais", label: "Triggers comportamentais", ...sliderProps },
              { name: "abTestingAutomatizado", label: "A/B testing automatizado", ...sliderProps },
              { name: "reEngajamentoAutomatico", label: "Re-engajamento automático", ...sliderProps },
              { name: "integracaoEventosSite", label: "Integração com eventos do site", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.14 Ferramentas de Produtividade"
            pathPrefix="tecnologiaAutomacoes.ferramentasProdutividade"
            fields={[
              { name: "loom", label: "Loom (vídeos rápidos)", ...sliderProps },
              { name: "calendly", label: "Calendly (agendamento automático)", ...sliderProps },
              { name: "typeformGoogleForms", label: "Typeform/Google Forms", ...sliderProps },
              { name: "docusignAssinaturasDigitais", label: "DocuSign (assinaturas digitais)", ...sliderProps },
              { name: "notionCodaDocumentacao", label: "Notion/Coda (documentação)", ...sliderProps },
              { name: "airtableBancoDadosVisual", label: "Airtable (banco de dados visual)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.15 SEO Técnico e Ferramentas"
            pathPrefix="tecnologiaAutomacoes.seoTecnicoFerramentas"
            fields={[
              { name: "googleSearchConsole", label: "Google Search Console", ...sliderProps },
              { name: "semrushAhrefs", label: "SEMrush/Ahrefs", ...sliderProps },
              { name: "screamingFrog", label: "Screaming Frog", ...sliderProps },
              { name: "schemaMarkup", label: "Schema markup", ...sliderProps },
              { name: "sitemapXml", label: "Sitemap XML", ...sliderProps },
              { name: "robotsTxt", label: "Robots.txt", ...sliderProps },
              { name: "coreWebVitals", label: "Core Web Vitals", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.16 Segurança e Compliance"
            pathPrefix="tecnologiaAutomacoes.segurancaCompliance"
            fields={[
              { name: "lgpd", label: "LGPD (Lei Geral de Proteção de Dados)", ...sliderProps },
              { name: "cookiesConsentimento", label: "Cookies e consentimento", ...sliderProps },
              { name: "politicasPrivacidade", label: "Políticas de privacidade", ...sliderProps },
              { name: "segurancaDadosClientes", label: "Segurança de dados de clientes", ...sliderProps },
              { name: "autenticacaoDoisFatores", label: "Autenticação de dois fatores", ...sliderProps },
              { name: "firewallProtecaoMalware", label: "Firewall e proteção contra malware", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.17 Analytics e Tag Management"
            pathPrefix="tecnologiaAutomacoes.analyticsTagManagement"
            fields={[
              { name: "googleAnalytics4", label: "Google Analytics 4", ...sliderProps },
              { name: "googleTagManager", label: "Google Tag Manager", ...sliderProps },
              { name: "facebookPixel", label: "Facebook Pixel", ...sliderProps },
              { name: "hotjarCrazyEgg", label: "Hotjar/Crazy Egg (heatmaps)", ...sliderProps },
              { name: "mixpanel", label: "Mixpanel", ...sliderProps },
              { name: "configuracaoEventosCustomizados", label: "Configuração de eventos customizados", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.18 Automação de Propostas e Contratos"
            pathPrefix="tecnologiaAutomacoes.automacaoPropostasContratos"
            fields={[
              { name: "pandadoc", label: "PandaDoc", ...sliderProps },
              { name: "proposify", label: "Proposify", ...sliderProps },
              { name: "docusign", label: "DocuSign", ...sliderProps },
              { name: "hellosign", label: "HelloSign", ...sliderProps },
              { name: "templatesAutomatizados", label: "Templates automatizados", ...sliderProps },
              { name: "followUpAutomaticoPropostas", label: "Follow-up automático de propostas", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.19 Gestão Financeira Automatizada"
            pathPrefix="tecnologiaAutomacoes.gestaoFinanceiraAutomatizada"
            fields={[
              { name: "integracaoBancaria", label: "Integração bancária", ...sliderProps },
              { name: "emissaoNotasFiscaisAutomaticas", label: "Emissão de notas fiscais automáticas", ...sliderProps },
              { name: "cobrancasRecorrentes", label: "Cobranças recorrentes", ...sliderProps },
              { name: "controleFluxoCaixa", label: "Controle de fluxo de caixa", ...sliderProps },
              { name: "ferramentasContaAzulOmieBling", label: "Ferramentas: Conta Azul, Omie, Bling", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.20 Backup e Recuperação"
            pathPrefix="tecnologiaAutomacoes.backupRecuperacao"
            fields={[
              { name: "backupAutomaticoSites", label: "Backup automático de sites", ...sliderProps },
              { name: "backupDadosCrm", label: "Backup de dados de CRM", ...sliderProps },
              { name: "versionamentoArquivos", label: "Versionamento de arquivos", ...sliderProps },
              { name: "planoDisasterRecovery", label: "Plano de disaster recovery", ...sliderProps },
              { name: "cloudBackup", label: "Cloud backup (Google Drive, Dropbox)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="Nível geral em Tecnologia & Automações"
            pathPrefix="tecnologiaAutomacoes"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TecnologiaAutomacoesStep;
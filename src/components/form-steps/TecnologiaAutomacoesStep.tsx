import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TecnologiaAutomacoesStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            9. Tecnologia & Automações
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Tecnologia & Automações.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="9.1 Infraestrutura Tecnológica"
            pathPrefix="tecnologiaAutomacoes.infraestruturaTecnologica"
            fields={[
              { name: "dominiosDns", label: "Domínios e DNS (GoDaddy, Registro.br, Cloudflare)", type: "checkbox" },
              { name: "hospedagemWeb", label: "Hospedagem web (AWS, Google Cloud, HostGator)", type: "checkbox" },
              { name: "servidoresCloudComputing", label: "Servidores e cloud computing", type: "checkbox" },
              { name: "sslCertificadosSeguranca", label: "SSL e certificados de segurança", type: "checkbox" },
              { name: "cdn", label: "CDN (Content Delivery Network)", type: "checkbox" },
              { name: "backupRecuperacaoDados", label: "Backup e recuperação de dados", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.2 Desenvolvimento Web"
            pathPrefix="tecnologiaAutomacoes.desenvolvimentoWeb"
            fields={[
              { name: "htmlCss3", label: "HTML5/CSS3", type: "checkbox" },
              { name: "javaScriptBasico", label: "JavaScript básico", type: "checkbox" },
              { name: "wordpressInstalacaoConfiguracao", label: "WordPress (instalação e configuração)", type: "checkbox" },
              { name: "pluginsEssenciaisWordpress", label: "Plugins essenciais do WordPress", type: "checkbox" },
              { name: "phpBasico", label: "PHP básico", type: "checkbox" },
              { name: "apisIntegracoes", label: "APIs e integrações", type: "checkbox" },
              { name: "versionamentoGitGithub", label: "Versionamento (Git/GitHub)", type: "checkbox" },
              { name: "responsiveDesign", label: "Responsive design", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.3 CMS e Plataformas"
            pathPrefix="tecnologiaAutomacoes.cmsPlataformas"
            fields={[
              { name: "wordpress", label: "WordPress", type: "checkbox" },
              { name: "webflow", label: "Webflow", type: "checkbox" },
              { name: "shopify", label: "Shopify", type: "checkbox" },
              { name: "wixSquarespace", label: "Wix/Squarespace", type: "checkbox" },
              { name: "drupalJoomla", label: "Drupal/Joomla", type: "checkbox" },
              { name: "headlessCms", label: "Headless CMS (Strapi, Contentful)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.4 Automação de Marketing"
            pathPrefix="tecnologiaAutomacoes.automacaoMarketing"
            fields={[
              { name: "rdStationMarketing", label: "RD Station Marketing (fluxos e automações)", type: "checkbox" },
              { name: "hubSpotWorkflows", label: "HubSpot (workflows e sequences)", type: "checkbox" },
              { name: "activeCampaignAutomacoes", label: "ActiveCampaign (automações de e-mail)", type: "checkbox" },
              { name: "mailchimpCustomerJourneys", label: "Mailchimp (customer journeys)", type: "checkbox" },
              { name: "klaviyoEcommerceAutomation", label: "Klaviyo (e-commerce automation)", type: "checkbox" },
              { name: "marketingCloudSalesforce", label: "Marketing Cloud (Salesforce)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.5 Automação de Processos (No-Code/Low-Code)"
            pathPrefix="tecnologiaAutomacoes.automacaoProcessosNoCodeLowCode"
            fields={[
              { name: "zapier", label: "Zapier (integrações entre apps)", type: "checkbox" },
              { name: "makeIntegromat", label: "Make (Integromat)", type: "checkbox" },
              { name: "n8n", label: "n8n (automação open-source)", type: "checkbox" },
              { name: "pabblyConnect", label: "Pabbly Connect", type: "checkbox" },
              { name: "automateIo", label: "Automate.io", type: "checkbox" },
              { name: "microsoftPowerAutomate", label: "Microsoft Power Automate", type: "checkbox" },
              { name: "ifttt", label: "IFTTT", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.6 Automação de Redes Sociais"
            pathPrefix="tecnologiaAutomacoes.automacaoRedesSociais"
            fields={[
              { name: "agendamentoAutomatico", label: "Agendamento automático (Buffer, Hootsuite)", type: "checkbox" },
              { name: "chatbotsInstagramFacebook", label: "Chatbots para Instagram/Facebook", type: "checkbox" },
              { name: "manyChat", label: "ManyChat (automação de mensagens)", type: "checkbox" },
              { name: "chatfuel", label: "Chatfuel", type: "checkbox" },
              { name: "respostaAutomaticaDm", label: "Resposta automática em DM", type: "checkbox" },
              { name: "automacaoStoriesPosts", label: "Automação de stories e posts", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.7 CRM e Gestão de Clientes"
            pathPrefix="tecnologiaAutomacoes.crmGestaoClientes"
            fields={[
              { name: "hubSpotCrm", label: "HubSpot CRM", type: "checkbox" },
              { name: "rdStationCrm", label: "RD Station CRM", type: "checkbox" },
              { name: "salesforce", label: "Salesforce", type: "checkbox" },
              { name: "pipedrive", label: "Pipedrive", type: "checkbox" },
              { name: "bitrix24", label: "Bitrix24", type: "checkbox" },
              { name: "zohoCrm", label: "Zoho CRM", type: "checkbox" },
              { name: "mondaySalesCrm", label: "Monday Sales CRM", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.8 Automação de WhatsApp Business"
            pathPrefix="tecnologiaAutomacoes.automacaoWhatsappBusiness"
            fields={[
              { name: "whatsappBusinessApi", label: "WhatsApp Business API", type: "checkbox" },
              { name: "chatbotsWhatsapp", label: "Chatbots para WhatsApp", type: "checkbox" },
              { name: "integracaoCrm", label: "Integração com CRM", type: "checkbox" },
              { name: "disparosMassa", label: "Disparos em massa (dentro das políticas)", type: "checkbox" },
              { name: "automacaoAtendimento", label: "Automação de atendimento", type: "checkbox" },
              { name: "plataformasTwilioZenviaTakeBlip", label: "Plataformas: Twilio, Zenvia, Take Blip", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.9 IA e Ferramentas Inteligentes"
            pathPrefix="tecnologiaAutomacoes.iaFerramentasInteligentes"
            fields={[
              { name: "chatGptClaude", label: "ChatGPT/Claude (para copywriting e brainstorm)", type: "checkbox" },
              { name: "midjourneyDallE", label: "Midjourney/DALL-E (criação de imagens)", type: "checkbox" },
              { name: "jasperAi", label: "Jasper AI (copywriting)", type: "checkbox" },
              { name: "copyAi", label: "Copy.ai", type: "checkbox" },
              { name: "runwayMl", label: "Runway ML (edição de vídeo com IA)", type: "checkbox" },
              { name: "removeBg", label: "Remove.bg (remoção de fundo)", type: "checkbox" },
              { name: "grammarly", label: "Grammarly (correção de textos)", type: "checkbox" },
              { name: "iaAnaliseDados", label: "IA para análise de dados", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.10 Automação de Relatórios"
            pathPrefix="tecnologiaAutomacoes.automacaoRelatorios"
            fields={[
              { name: "googleDataStudioLookerStudio", label: "Google Data Studio/Looker Studio", type: "checkbox" },
              { name: "powerBi", label: "Power BI", type: "checkbox" },
              { name: "tableau", label: "Tableau", type: "checkbox" },
              { name: "dashboardsAutomaticos", label: "Dashboards automáticos", type: "checkbox" },
              { name: "integracaoMultiplasFontesDados", label: "Integração de múltiplas fontes de dados", type: "checkbox" },
              { name: "relatoriosAgendadosAutomaticamente", label: "Relatórios agendados automaticamente", type: "checkbox" },
              { name: "googleSheetsScripts", label: "Google Sheets com scripts", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.11 Ferramentas de Colaboração"
            pathPrefix="tecnologiaAutomacoes.ferramentasColaboracao"
            fields={[
              { name: "slack", label: "Slack (+ integrações e bots)", type: "checkbox" },
              { name: "microsoftTeams", label: "Microsoft Teams", type: "checkbox" },
              { name: "discord", label: "Discord", type: "checkbox" },
              { name: "notionBaseConhecimento", label: "Notion (base de conhecimento)", type: "checkbox" },
              { name: "googleWorkspace", label: "Google Workspace", type: "checkbox" },
              { name: "asanaTrelloMonday", label: "Asana/Trello/Monday (automações)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.12 E-commerce e Pagamentos"
            pathPrefix="tecnologiaAutomacoes.ecommercePagamentos"
            fields={[
              { name: "integracaoGatewaysPagamento", label: "Integração com gateways de pagamento", type: "checkbox" },
              { name: "stripe", label: "Stripe", type: "checkbox" },
              { name: "paypal", label: "PayPal", type: "checkbox" },
              { name: "mercadoPago", label: "Mercado Pago", type: "checkbox" },
              { name: "pagSeguro", label: "PagSeguro", type: "checkbox" },
              { name: "automacaoCarrinhoAbandonado", label: "Automação de carrinho abandonado", type: "checkbox" },
              { name: "upsellCrossSellAutomatizados", label: "Upsell e cross-sell automatizados", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.13 Automação de E-mail"
            pathPrefix="tecnologiaAutomacoes.automacaoEmail"
            fields={[
              { name: "sequenciasNutricao", label: "Sequências de nutrição", type: "checkbox" },
              { name: "segmentacaoDinamica", label: "Segmentação dinâmica", type: "checkbox" },
              { name: "triggersComportamentais", label: "Triggers comportamentais", type: "checkbox" },
              { name: "abTestingAutomatizado", label: "A/B testing automatizado", type: "checkbox" },
              { name: "reEngajamentoAutomatico", label: "Re-engajamento automático", type: "checkbox" },
              { name: "integracaoEventosSite", label: "Integração com eventos do site", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.14 Ferramentas de Produtividade"
            pathPrefix="tecnologiaAutomacoes.ferramentasProdutividade"
            fields={[
              { name: "loom", label: "Loom (vídeos rápidos)", type: "checkbox" },
              { name: "calendly", label: "Calendly (agendamento automático)", type: "checkbox" },
              { name: "typeformGoogleForms", label: "Typeform/Google Forms", type: "checkbox" },
              { name: "docusignAssinaturasDigitais", label: "DocuSign (assinaturas digitais)", type: "checkbox" },
              { name: "notionCodaDocumentacao", label: "Notion/Coda (documentação)", type: "checkbox" },
              { name: "airtableBancoDadosVisual", label: "Airtable (banco de dados visual)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.15 SEO Técnico e Ferramentas"
            pathPrefix="tecnologiaAutomacoes.seoTecnicoFerramentas"
            fields={[
              { name: "googleSearchConsole", label: "Google Search Console", type: "checkbox" },
              { name: "semrushAhrefs", label: "SEMrush/Ahrefs", type: "checkbox" },
              { name: "screamingFrog", label: "Screaming Frog", type: "checkbox" },
              { name: "schemaMarkup", label: "Schema markup", type: "checkbox" },
              { name: "sitemapXml", label: "Sitemap XML", type: "checkbox" },
              { name: "robotsTxt", label: "Robots.txt", type: "checkbox" },
              { name: "coreWebVitals", label: "Core Web Vitals", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.16 Segurança e Compliance"
            pathPrefix="tecnologiaAutomacoes.segurancaCompliance"
            fields={[
              { name: "lgpd", label: "LGPD (Lei Geral de Proteção de Dados)", type: "checkbox" },
              { name: "cookiesConsentimento", label: "Cookies e consentimento", type: "checkbox" },
              { name: "politicasPrivacidade", label: "Políticas de privacidade", type: "checkbox" },
              { name: "segurancaDadosClientes", label: "Segurança de dados de clientes", type: "checkbox" },
              { name: "autenticacaoDoisFatores", label: "Autenticação de dois fatores", type: "checkbox" },
              { name: "firewallProtecaoMalware", label: "Firewall e proteção contra malware", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.17 Analytics e Tag Management"
            pathPrefix="tecnologiaAutomacoes.analyticsTagManagement"
            fields={[
              { name: "googleAnalytics4", label: "Google Analytics 4", type: "checkbox" },
              { name: "googleTagManager", label: "Google Tag Manager", type: "checkbox" },
              { name: "facebookPixel", label: "Facebook Pixel", type: "checkbox" },
              { name: "hotjarCrazyEgg", label: "Hotjar/Crazy Egg (heatmaps)", type: "checkbox" },
              { name: "mixpanel", label: "Mixpanel", type: "checkbox" },
              { name: "configuracaoEventosCustomizados", label: "Configuração de eventos customizados", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.18 Automação de Propostas e Contratos"
            pathPrefix="tecnologiaAutomacoes.automacaoPropostasContratos"
            fields={[
              { name: "pandadoc", label: "PandaDoc", type: "checkbox" },
              { name: "proposify", label: "Proposify", type: "checkbox" },
              { name: "docusign", label: "DocuSign", type: "checkbox" },
              { name: "hellosign", label: "HelloSign", type: "checkbox" },
              { name: "templatesAutomatizados", label: "Templates automatizados", type: "checkbox" },
              { name: "followUpAutomaticoPropostas", label: "Follow-up automático de propostas", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.19 Gestão Financeira Automatizada"
            pathPrefix="tecnologiaAutomacoes.gestaoFinanceiraAutomatizada"
            fields={[
              { name: "integracaoBancaria", label: "Integração bancária", type: "checkbox" },
              { name: "emissaoNotasFiscaisAutomaticas", label: "Emissão de notas fiscais automáticas", type: "checkbox" },
              { name: "cobrancasRecorrentes", label: "Cobranças recorrentes", type: "checkbox" },
              { name: "controleFluxoCaixa", label: "Controle de fluxo de caixa", type: "checkbox" },
              { name: "ferramentasContaAzulOmieBling", label: "Ferramentas: Conta Azul, Omie, Bling", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="9.20 Backup e Recuperação"
            pathPrefix="tecnologiaAutomacoes.backupRecuperacao"
            fields={[
              { name: "backupAutomaticoSites", label: "Backup automático de sites", type: "checkbox" },
              { name: "backupDadosCrm", label: "Backup de dados de CRM", type: "checkbox" },
              { name: "versionamentoArquivos", label: "Versionamento de arquivos", type: "checkbox" },
              { name: "planoDisasterRecovery", label: "Plano de disaster recovery", type: "checkbox" },
              { name: "cloudBackup", label: "Cloud backup (Google Drive, Dropbox)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="Nível geral em Tecnologia & Automações"
            pathPrefix="tecnologiaAutomacoes"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", type: "slider", min: 1, max: 5, step: 1 },
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
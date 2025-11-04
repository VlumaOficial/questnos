import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            8. Marketing
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Marketing.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="8.1 Marketing Digital"
            pathPrefix="marketing.marketingDigital"
            fields={[
              { name: "seo", label: "SEO (on-page e off-page)", type: "checkbox" },
              { name: "marketingConteudo", label: "Marketing de conteúdo", type: "checkbox" },
              { name: "emailMarketing", label: "E-mail marketing", type: "checkbox" },
              { name: "marketingPerformance", label: "Marketing de performance", type: "checkbox" },
              { name: "growthHacking", label: "Growth hacking", type: "checkbox" },
              { name: "marketingInfluencia", label: "Marketing de influência", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.2 Estratégia"
            pathPrefix="marketing.estrategia"
            fields={[
              { name: "planejamentoEstrategico", label: "Planejamento estratégico", type: "checkbox" },
              { name: "definicaoKpis", label: "Definição de KPIs", type: "checkbox" },
              { name: "analiseMercado", label: "Análise de mercado", type: "checkbox" },
              { name: "buyerPersonas", label: "Buyer personas", type: "checkbox" },
              { name: "funilVendas", label: "Funil de vendas (TOFU, MOFU, BOFU)", type: "checkbox" },
              { name: "customerJourneyMapping", label: "Customer journey mapping", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.3 Análise e Dados"
            pathPrefix="marketing.analiseDados"
            fields={[
              { name: "googleAnalyticsGa4", label: "Google Analytics (GA4)", type: "checkbox" },
              { name: "googleSearchConsole", label: "Google Search Console", type: "checkbox" },
              { name: "dataStudioLookerStudio", label: "Data Studio/Looker Studio", type: "checkbox" },
              { name: "excelGoogleSheetsAvancado", label: "Excel/Google Sheets avançado", type: "checkbox" },
              { name: "interpretacaoMetricas", label: "Interpretação de métricas", type: "checkbox" },
              { name: "relatoriosPerformance", label: "Relatórios de performance", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.4 Automação"
            pathPrefix="marketing.automacao"
            fields={[
              { name: "rdStation", label: "RD Station", type: "checkbox" },
              { name: "hubSpot", label: "HubSpot", type: "checkbox" },
              { name: "mailchimp", label: "Mailchimp", type: "checkbox" },
              { name: "activeCampaign", label: "ActiveCampaign", type: "checkbox" },
              { name: "zapierMake", label: "Zapier/Make", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Marketing"
            pathPrefix="marketing"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", type: "slider", min: 1, max: 5, step: 1 },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStep;
import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const MarketingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            8. Marketing
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Marketing.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="8.1 Marketing Digital"
            pathPrefix="marketing.marketingDigital"
            fields={[
              { name: "seo", label: "SEO (on-page e off-page)", ...sliderProps },
              { name: "marketingConteudo", label: "Marketing de conteúdo", ...sliderProps },
              { name: "emailMarketing", label: "E-mail marketing", ...sliderProps },
              { name: "marketingPerformance", label: "Marketing de performance", ...sliderProps },
              { name: "growthHacking", label: "Growth hacking", ...sliderProps },
              { name: "marketingInfluencia", label: "Marketing de influência", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.2 Estratégia"
            pathPrefix="marketing.estrategia"
            fields={[
              { name: "planejamentoEstrategico", label: "Planejamento estratégico", ...sliderProps },
              { name: "definicaoKpis", label: "Definição de KPIs", ...sliderProps },
              { name: "analiseMercado", label: "Análise de mercado", ...sliderProps },
              { name: "buyerPersonas", label: "Buyer personas", ...sliderProps },
              { name: "funilVendas", label: "Funil de vendas (TOFU, MOFU, BOFU)", ...sliderProps },
              { name: "customerJourneyMapping", label: "Customer journey mapping", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.3 Análise e Dados"
            pathPrefix="marketing.analiseDados"
            fields={[
              { name: "googleAnalyticsGa4", label: "Google Analytics (GA4)", ...sliderProps },
              { name: "googleSearchConsole", label: "Google Search Console", ...sliderProps },
              { name: "dataStudioLookerStudio", label: "Data Studio/Looker Studio", ...sliderProps },
              { name: "excelGoogleSheetsAvancado", label: "Excel/Google Sheets avançado", ...sliderProps },
              { name: "interpretacaoMetricas", label: "Interpretação de métricas", ...sliderProps },
              { name: "relatoriosPerformance", label: "Relatórios de performance", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="8.4 Automação"
            pathPrefix="marketing.automacao"
            fields={[
              { name: "rdStation", label: "RD Station", ...sliderProps },
              { name: "hubSpot", label: "HubSpot", ...sliderProps },
              { name: "mailchimp", label: "Mailchimp", ...sliderProps },
              { name: "activeCampaign", label: "ActiveCampaign", ...sliderProps },
              { name: "zapierMake", label: "Zapier/Make", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Marketing"
            pathPrefix="marketing"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
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
import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPagesStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            6. Landing Pages
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Landing Pages.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="6.1 Desenvolvimento"
            pathPrefix="landingPages.desenvolvimento"
            fields={[
              { name: "htmlCssBasico", label: "HTML/CSS básico", type: "checkbox" },
              { name: "wordpress", label: "WordPress", type: "checkbox" },
              { name: "elementorWpBakery", label: "Elementor/WPBakery", type: "checkbox" },
              { name: "unbounce", label: "Unbounce", type: "checkbox" },
              { name: "leadpages", label: "Leadpages", type: "checkbox" },
              { name: "webflow", label: "Webflow", type: "checkbox" },
              { name: "rdStationHubSpot", label: "RD Station/HubSpot", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="6.2 Otimização"
            pathPrefix="landingPages.otimizacao"
            fields={[
              { name: "uxUiConversao", label: "UX/UI para conversão", type: "checkbox" },
              { name: "testesAb", label: "Testes A/B", type: "checkbox" },
              { name: "otimizacaoFormularios", label: "Otimização de formulários", type: "checkbox" },
              { name: "copywritingLandingPages", label: "Copywriting para landing pages", type: "checkbox" },
              { name: "analiseHeatmaps", label: "Análise de heatmaps", type: "checkbox" },
              { name: "pageSpeedOptimization", label: "Page speed optimization", type: "checkbox" },
              { name: "mobileResponsiveness", label: "Mobile responsiveness", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="6.3 Integrações"
            pathPrefix="landingPages.integracoes"
            fields={[
              { name: "googleAnalytics", label: "Google Analytics", type: "checkbox" },
              { name: "googleTagManager", label: "Google Tag Manager", type: "checkbox" },
              { name: "pixelFacebookMeta", label: "Pixel do Facebook/Meta", type: "checkbox" },
              { name: "crm", label: "CRM (RD, HubSpot, ActiveCampaign)", type: "checkbox" },
              { name: "ferramentasAutomacao", label: "Ferramentas de automação", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="Nível geral em Landing Pages"
            pathPrefix="landingPages"
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

export default LandingPagesStep;
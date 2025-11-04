import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const LandingPagesStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            6. Landing Pages
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Landing Pages.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="6.1 Desenvolvimento"
            pathPrefix="landingPages.desenvolvimento"
            fields={[
              { name: "htmlCssBasico", label: "HTML/CSS básico", ...sliderProps },
              { name: "wordpress", label: "WordPress", ...sliderProps },
              { name: "elementorWpBakery", label: "Elementor/WPBakery", ...sliderProps },
              { name: "unbounce", label: "Unbounce", ...sliderProps },
              { name: "leadpages", label: "Leadpages", ...sliderProps },
              { name: "webflow", label: "Webflow", ...sliderProps },
              { name: "rdStationHubSpot", label: "RD Station/HubSpot", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="6.2 Otimização"
            pathPrefix="landingPages.otimizacao"
            fields={[
              { name: "uxUiConversao", label: "UX/UI para conversão", ...sliderProps },
              { name: "testesAb", label: "Testes A/B", ...sliderProps },
              { name: "otimizacaoFormularios", label: "Otimização de formulários", ...sliderProps },
              { name: "copywritingLandingPages", label: "Copywriting para landing pages", ...sliderProps },
              { name: "analiseHeatmaps", label: "Análise de heatmaps", ...sliderProps },
              { name: "pageSpeedOptimization", label: "Page speed optimization", ...sliderProps },
              { name: "mobileResponsiveness", label: "Mobile responsiveness", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="6.3 Integrações"
            pathPrefix="landingPages.integracoes"
            fields={[
              { name: "googleAnalytics", label: "Google Analytics", ...sliderProps },
              { name: "googleTagManager", label: "Google Tag Manager", ...sliderProps },
              { name: "pixelFacebookMeta", label: "Pixel do Facebook/Meta", ...sliderProps },
              { name: "crm", label: "CRM (RD, HubSpot, ActiveCampaign)", ...sliderProps },
              { name: "ferramentasAutomacao", label: "Ferramentas de automação", ...sliderProps },
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
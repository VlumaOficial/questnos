import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PublicidadeStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            7. Publicidade
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Publicidade.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="7.1 Mídia Paga"
            pathPrefix="publicidade.midiaPaga"
            fields={[
              { name: "googleAds", label: "Google Ads (Search, Display, YouTube)", type: "checkbox" },
              { name: "metaAds", label: "Meta Ads (Facebook/Instagram)", type: "checkbox" },
              { name: "linkedinAds", label: "LinkedIn Ads", type: "checkbox" },
              { name: "tiktokAds", label: "TikTok Ads", type: "checkbox" },
              { name: "pinterestAds", label: "Pinterest Ads", type: "checkbox" },
              { name: "programatica", label: "Programática", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="7.2 Estratégia"
            pathPrefix="publicidade.estrategia"
            fields={[
              { name: "definicaoPublicoAlvo", label: "Definição de público-alvo", type: "checkbox" },
              { name: "segmentacaoAvancada", label: "Segmentação avançada", type: "checkbox" },
              { name: "budgetLances", label: "Budget e lances", type: "checkbox" },
              { name: "funisConversao", label: "Funis de conversão", type: "checkbox" },
              { name: "remarketingRetargeting", label: "Remarketing/Retargeting", type: "checkbox" },
              { name: "analiseRoiRoas", label: "Análise de ROI e ROAS", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="7.3 Creative"
            pathPrefix="publicidade.creative"
            fields={[
              { name: "criacaoAnuncios", label: "Criação de anúncios", type: "checkbox" },
              { name: "testesCriativos", label: "Testes de criativos", type: "checkbox" },
              { name: "videoAds", label: "Vídeo ads", type: "checkbox" },
              { name: "carouselColecoes", label: "Carousel e coleções", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="Nível geral em Publicidade"
            pathPrefix="publicidade"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", type: "slider", min: 1, max: 5, step: 1 },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicidadeStep;
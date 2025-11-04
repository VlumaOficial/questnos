import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const PublicidadeStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            7. Publicidade
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Publicidade.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="7.1 Mídia Paga"
            pathPrefix="publicidade.midiaPaga"
            fields={[
              { name: "googleAds", label: "Google Ads (Search, Display, YouTube)", ...sliderProps },
              { name: "metaAds", label: "Meta Ads (Facebook/Instagram)", ...sliderProps },
              { name: "linkedinAds", label: "LinkedIn Ads", ...sliderProps },
              { name: "tiktokAds", label: "TikTok Ads", ...sliderProps },
              { name: "pinterestAds", label: "Pinterest Ads", ...sliderProps },
              { name: "programatica", label: "Programática", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="7.2 Estratégia"
            pathPrefix="publicidade.estrategia"
            fields={[
              { name: "definicaoPublicoAlvo", label: "Definição de público-alvo", ...sliderProps },
              { name: "segmentacaoAvancada", label: "Segmentação avançada", ...sliderProps },
              { name: "budgetLances", label: "Budget e lances", ...sliderProps },
              { name: "funisConversao", label: "Funis de conversão", ...sliderProps },
              { name: "remarketingRetargeting", label: "Remarketing/Retargeting", ...sliderProps },
              { name: "analiseRoiRoas", label: "Análise de ROI e ROAS", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="7.3 Creative"
            pathPrefix="publicidade.creative"
            fields={[
              { name: "criacaoAnuncios", label: "Criação de anúncios", ...sliderProps },
              { name: "testesCriativos", label: "Testes de criativos", ...sliderProps },
              { name: "videoAds", label: "Vídeo ads", ...sliderProps },
              { name: "carouselColecoes", label: "Carousel e coleções", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="Nível geral em Publicidade"
            pathPrefix="publicidade"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
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
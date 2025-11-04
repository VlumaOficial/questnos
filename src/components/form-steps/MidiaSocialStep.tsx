import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const MidiaSocialStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            5. Mídia Social (Social Media)
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Mídia Social.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="5.1 Plataformas"
            pathPrefix="midiaSocial.plataformas"
            fields={[
              { name: "instagram", label: "Instagram (feed, stories, reels)", ...sliderProps },
              { name: "facebook", label: "Facebook", ...sliderProps },
              { name: "linkedin", label: "LinkedIn", ...sliderProps },
              { name: "tiktok", label: "TikTok", ...sliderProps },
              { name: "youtube", label: "YouTube", ...sliderProps },
              { name: "twitterX", label: "Twitter/X", ...sliderProps },
              { name: "pinterest", label: "Pinterest", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="5.2 Gestão"
            pathPrefix="midiaSocial.gestao"
            fields={[
              { name: "planejamentoConteudo", label: "Planejamento de conteúdo", ...sliderProps },
              { name: "calendarioEditorial", label: "Calendário editorial", ...sliderProps },
              { name: "analiseMetricasKpis", label: "Análise de métricas e KPIs", ...sliderProps },
              { name: "gerenciamentoComunidade", label: "Gerenciamento de comunidade", ...sliderProps },
              { name: "atendimentoCliente", label: "Atendimento ao cliente", ...sliderProps },
              { name: "gestaoCrises", label: "Gestão de crises", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="5.3 Ferramentas"
            pathPrefix="midiaSocial.ferramentas"
            fields={[
              { name: "metaBusinessSuite", label: "Meta Business Suite", ...sliderProps },
              { name: "hootsuiteBuffer", label: "Hootsuite/Buffer", ...sliderProps },
              { name: "sproutSocial", label: "Sprout Social", ...sliderProps },
              { name: "laterPlanable", label: "Later/Planable", ...sliderProps },
              { name: "analiseNativaPlataformas", label: "Análise nativa das plataformas", ...sliderProps },
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

export default MidiaSocialStep;
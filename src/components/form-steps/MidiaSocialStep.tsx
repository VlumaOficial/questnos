import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MidiaSocialStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            5. Mídia Social (Social Media)
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Mídia Social.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="5.1 Plataformas"
            pathPrefix="midiaSocial.plataformas"
            fields={[
              { name: "instagram", label: "Instagram (feed, stories, reels)", type: "checkbox" },
              { name: "facebook", label: "Facebook", type: "checkbox" },
              { name: "linkedin", label: "LinkedIn", type: "checkbox" },
              { name: "tiktok", label: "TikTok", type: "checkbox" },
              { name: "youtube", label: "YouTube", type: "checkbox" },
              { name: "twitterX", label: "Twitter/X", type: "checkbox" },
              { name: "pinterest", label: "Pinterest", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="5.2 Gestão"
            pathPrefix="midiaSocial.gestao"
            fields={[
              { name: "planejamentoConteudo", label: "Planejamento de conteúdo", type: "checkbox" },
              { name: "calendarioEditorial", label: "Calendário editorial", type: "checkbox" },
              { name: "analiseMetricasKpis", label: "Análise de métricas e KPIs", type: "checkbox" },
              { name: "gerenciamentoComunidade", label: "Gerenciamento de comunidade", type: "checkbox" },
              { name: "atendimentoCliente", label: "Atendimento ao cliente", type: "checkbox" },
              { name: "gestaoCrises", label: "Gestão de crises", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="5.3 Ferramentas"
            pathPrefix="midiaSocial.ferramentas"
            fields={[
              { name: "metaBusinessSuite", label: "Meta Business Suite", type: "checkbox" },
              { name: "hootsuiteBuffer", label: "Hootsuite/Buffer", type: "checkbox" },
              { name: "sproutSocial", label: "Sprout Social", type: "checkbox" },
              { name: "laterPlanable", label: "Later/Planable", type: "checkbox" },
              { name: "analiseNativaPlataformas", label: "Análise nativa das plataformas", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Mídia Social"
            pathPrefix="midiaSocial"
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

export default MidiaSocialStep;
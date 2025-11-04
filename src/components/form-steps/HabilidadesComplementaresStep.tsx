import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const HabilidadesComplementaresStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            10. Habilidades Complementares
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Habilidades Complementares.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="10.1 Gestão de Projetos"
            pathPrefix="habilidadesComplementares.gestaoProjetos"
            fields={[
              { name: "metodologiasAgeis", label: "Metodologias ágeis (Scrum, Kanban)", ...sliderProps },
              { name: "trelloAsanaMonday", label: "Trello/Asana/Monday", ...sliderProps },
              { name: "gestaoPrazos", label: "Gestão de prazos", ...sliderProps },
              { name: "briefingDebriefing", label: "Briefing e debriefing", ...sliderProps },
              { name: "gestaoEquipe", label: "Gestão de equipe", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="10.2 Atendimento ao Cliente"
            pathPrefix="habilidadesComplementares.atendimentoCliente"
            fields={[
              { name: "relacionamentoCliente", label: "Relacionamento com cliente", ...sliderProps },
              { name: "apresentacoesComerciais", label: "Apresentações comerciais", ...sliderProps },
              { name: "negociacao", label: "Negociação", ...sliderProps },
              { name: "propostasComerciais", label: "Propostas comerciais", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="10.3 Outras Skills"
            pathPrefix="habilidadesComplementares.outrasSkills"
            fields={[
              { name: "fotografiaBasica", label: "Fotografia básica", ...sliderProps },
              { name: "edicaoVideo", label: "Edição de vídeo", ...sliderProps },
              { name: "producaoAudiovisual", label: "Produção audiovisual", ...sliderProps },
              { name: "audioPodcast", label: "Áudio e podcast", ...sliderProps },
              { name: "nocoesProgramacao", label: "Noções de programação", ...sliderProps },
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

export default HabilidadesComplementaresStep;
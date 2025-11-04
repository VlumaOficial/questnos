import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HabilidadesComplementaresStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            10. Habilidades Complementares
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Habilidades Complementares.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="10.1 Gestão de Projetos"
            pathPrefix="habilidadesComplementares.gestaoProjetos"
            fields={[
              { name: "metodologiasAgeis", label: "Metodologias ágeis (Scrum, Kanban)", type: "checkbox" },
              { name: "trelloAsanaMonday", label: "Trello/Asana/Monday", type: "checkbox" },
              { name: "gestaoPrazos", label: "Gestão de prazos", type: "checkbox" },
              { name: "briefingDebriefing", label: "Briefing e debriefing", type: "checkbox" },
              { name: "gestaoEquipe", label: "Gestão de equipe", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="10.2 Atendimento ao Cliente"
            pathPrefix="habilidadesComplementares.atendimentoCliente"
            fields={[
              { name: "relacionamentoCliente", label: "Relacionamento com cliente", type: "checkbox" },
              { name: "apresentacoesComerciais", label: "Apresentações comerciais", type: "checkbox" },
              { name: "negociacao", label: "Negociação", type: "checkbox" },
              { name: "propostasComerciais", label: "Propostas comerciais", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="10.3 Outras Skills"
            pathPrefix="habilidadesComplementares.outrasSkills"
            fields={[
              { name: "fotografiaBasica", label: "Fotografia básica", type: "checkbox" },
              { name: "edicaoVideo", label: "Edição de vídeo", type: "checkbox" },
              { name: "producaoAudiovisual", label: "Produção audiovisual", type: "checkbox" },
              { name: "audioPodcast", label: "Áudio e podcast", type: "checkbox" },
              { name: "nocoesProgramacao", label: "Noções de programação", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="Nível geral em Habilidades Complementares"
            pathPrefix="habilidadesComplementares"
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

export default HabilidadesComplementaresStep;
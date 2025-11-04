import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SoftSkillsStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            11. Soft Skills
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível em cada Soft Skill de 1 a 5.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="Avaliação de Soft Skills"
            pathPrefix="softSkills"
            fields={[
              { name: "criatividade", label: "Criatividade", type: "slider", min: 1, max: 5, step: 1 },
              { name: "comunicacao", label: "Comunicação", type: "slider", min: 1, max: 5, step: 1 },
              { name: "trabalhoEmEquipe", label: "Trabalho em equipe", type: "slider", min: 1, max: 5, step: 1 },
              { name: "gestaoDeTempo", label: "Gestão de tempo", type: "slider", min: 1, max: 5, step: 1 },
              { name: "proatividade", label: "Proatividade", type: "slider", min: 1, max: 5, step: 1 },
              { name: "resolucaoDeProblemas", label: "Resolução de problemas", type: "slider", min: 1, max: 5, step: 1 },
              { name: "adaptabilidade", label: "Adaptabilidade", type: "slider", min: 1, max: 5, step: 1 },
              { name: "atencaoAosDetalhes", label: "Atenção aos detalhes", type: "slider", min: 1, max: 5, step: 1 },
              { name: "sensoDeUrgencia", label: "Senso de urgência", type: "slider", min: 1, max: 5, step: 1 },
              { name: "capacidadeAnalitica", label: "Capacidade analítica", type: "slider", min: 1, max: 5, step: 1 },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Soft Skills"
            pathPrefix="softSkills"
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

export default SoftSkillsStep;
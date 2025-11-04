import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const SoftSkillsStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            11. Soft Skills
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada Soft Skill.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="Avaliação de Soft Skills"
            pathPrefix="softSkills"
            fields={[
              { name: "criatividade", label: "Criatividade", ...sliderProps },
              { name: "comunicacao", label: "Comunicação", ...sliderProps },
              { name: "trabalhoEmEquipe", label: "Trabalho em equipe", ...sliderProps },
              { name: "gestaoDeTempo", label: "Gestão de tempo", ...sliderProps },
              { name: "proatividade", label: "Proatividade", ...sliderProps },
              { name: "resolucaoDeProblemas", label: "Resolução de problemas", ...sliderProps },
              { name: "adaptabilidade", label: "Adaptabilidade", ...sliderProps },
              { name: "atencaoAosDetalhes", label: "Atenção aos detalhes", ...sliderProps },
              { name: "sensoDeUrgencia", label: "Senso de urgência", ...sliderProps },
              { name: "capacidadeAnalitica", label: "Capacidade analítica", ...sliderProps },
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
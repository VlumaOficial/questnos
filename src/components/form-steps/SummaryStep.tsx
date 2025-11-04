import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireSchema } from "@/schemas/questionnaireSchema";

const SummaryStep: React.FC = () => {
  const { getValues } = useFormContext<QuestionnaireSchema>();
  const formData = getValues();

  const renderSection = (title: string, data: any) => {
    if (!data) return null;

    return (
      <div className="mb-6 p-4 border rounded-md bg-muted/20 border-inclusive-purple/30">
        <h3 className="text-xl font-semibold text-inclusive-purple mb-3">{title}</h3>
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <p key={key} className="text-sm text-foreground">
                <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>{" "}
                {value ? "Sim" : "Não"}
              </p>
            );
          } else if (typeof value === "number") {
            return (
              <p key={key} className="text-sm text-foreground">
                <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>{" "}
                {value}
              </p>
            );
          } else if (typeof value === "object" && value !== null) {
            return (
              <div key={key} className="ml-4 mt-2">
                <h4 className="font-medium text-inclusive-orange/80">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <p key={subKey} className="text-xs text-muted-foreground ml-2">
                    <span className="font-normal">{subKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>{" "}
                    {typeof subValue === "boolean" ? (subValue ? "Sim" : "Não") : subValue}
                  </p>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            Resumo do Questionário
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Revise suas respostas antes de finalizar.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {renderSection("Branding & Rebranding", formData.brandingRebranding)}
          {renderSection("Copywriting", formData.copywriting)}
          {renderSection("Redação", formData.redacao)}
          {renderSection("Arte & Design", formData.arteDesign)}
          {renderSection("Mídia Social", formData.midiaSocial)}
          {renderSection("Landing Pages", formData.landingPages)}
          {renderSection("Publicidade", formData.publicidade)}
          {renderSection("Marketing", formData.marketing)}
          {renderSection("Tecnologia & Automações", formData.tecnologiaAutomacoes)}
          {renderSection("Habilidades Complementares", formData.habilidadesComplementares)}
          {renderSection("Soft Skills", formData.softSkills)}

          <div className="mt-8 p-4 bg-inclusive-yellow/10 rounded-md border border-inclusive-orange">
            <h2 className="text-xl font-semibold text-inclusive-blue mb-3">Instruções de Avaliação</h2>
            <p className="text-muted-foreground mb-2">Você avaliou cada habilidade de 1 a 5:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong className="text-inclusive-blue">1</strong> - Sem conhecimento</li>
              <li><strong className="text-inclusive-blue">2</strong> - Conhecimento básico</li>
              <li><strong className="text-inclusive-blue">3</strong> - Conhecimento intermediário</li>
              <li><strong className="text-inclusive-blue">4</strong> - Conhecimento avançado</li>
              <li><strong className="text-inclusive-blue">5</strong> - Especialista/Expert</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStep;
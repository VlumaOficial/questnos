import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireSchema } from "@/schemas/questionnaireSchema";

const formatKey = (key: string) => {
  // Converte camelCase para texto com espaços e capitaliza a primeira letra
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const renderData = (data: any, level: number = 0) => {
  if (!data || typeof data !== 'object') return null;

  return Object.entries(data).map(([key, value]) => {
    const formattedKey = formatKey(key);
    const isNestedObject = typeof value === "object" && value !== null && !Array.isArray(value);
    const isNumber = typeof value === "number";

    if (isNestedObject) {
      // Renderiza subseções
      return (
        <div key={key} className={`mt-3 ${level > 0 ? 'ml-4 border-l pl-3 border-inclusive-purple/20' : ''}`}>
          <h4 className={`font-semibold ${level === 0 ? 'text-lg text-inclusive-orange' : 'text-base text-inclusive-blue/90'}`}>
            {formattedKey}
          </h4>
          {renderData(value, level + 1)}
        </div>
      );
    } else if (isNumber) {
      // Renderiza campos de slider (1-5)
      const displayValue = value;
      const valueClass = "font-bold text-inclusive-blue";
      
      return (
        <p key={key} className={`text-sm text-foreground mt-1 ${level > 0 ? 'ml-2' : ''}`}>
          <span className="font-medium text-muted-foreground">{formattedKey}:</span>{" "}
          <span className={valueClass}>{displayValue}</span>
        </p>
      );
    }
    return null;
  });
};

const SummaryStep: React.FC = () => {
  const { getValues } = useFormContext<QuestionnaireSchema>();
  const formData = getValues();

  const sections = [
    { title: "1. Branding & Rebranding", key: "brandingRebranding" },
    { title: "2. Copywriting", key: "copywriting" },
    { title: "3. Redação", key: "redacao" },
    { title: "4. Arte & Design", key: "arteDesign" },
    { title: "5. Mídia Social", key: "midiaSocial" },
    { title: "6. Landing Pages", key: "landingPages" },
    { title: "7. Publicidade", key: "publicidade" },
    { title: "8. Marketing", key: "marketing" },
    { title: "9. Tecnologia & Automações", key: "tecnologiaAutomacoes" },
    { title: "10. Habilidades Complementares", key: "habilidadesComplementares" },
    { title: "11. Soft Skills", key: "softSkills" },
  ];

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
          {sections.map(section => (
            <div key={section.key} className="p-4 border rounded-md bg-muted/20 border-inclusive-purple/30">
              <h3 className="text-xl font-bold text-inclusive-purple mb-3 border-b pb-2">
                {section.title}
              </h3>
              {renderData(formData[section.key as keyof QuestionnaireSchema])}
            </div>
          ))}

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
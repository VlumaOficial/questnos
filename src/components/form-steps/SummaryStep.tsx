import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireSchema } from "@/schemas/questionnaireSchema";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryStepProps {
  onNavigateToStep: (stepIndex: number) => void;
}

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
          <h4 className={`font-semibold ${level === 0 ? 'text-base text-inclusive-orange' : 'text-sm text-inclusive-blue/90'}`}>
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
        <p key={key} className={`text-sm text-foreground mt-1 flex justify-between items-center ${level > 0 ? 'ml-2' : ''}`}>
          <span className="font-medium text-muted-foreground">{formattedKey}:</span>{" "}
          <span className={valueClass}>{displayValue}</span>
        </p>
      );
    }
    return null;
  });
};

const SummaryStep: React.FC<SummaryStepProps> = ({ onNavigateToStep }) => {
  const { getValues } = useFormContext<QuestionnaireSchema>();
  const formData = getValues();

  const sections = [
    { title: "1. Branding & Rebranding", key: "brandingRebranding", stepIndex: 0 },
    { title: "2. Copywriting", key: "copywriting", stepIndex: 1 },
    { title: "3. Redação", key: "redacao", stepIndex: 2 },
    { title: "4. Arte & Design", key: "arteDesign", stepIndex: 3 },
    { title: "5. Mídia Social", key: "midiaSocial", stepIndex: 4 },
    { title: "6. Landing Pages", key: "landingPages", stepIndex: 5 },
    { title: "7. Publicidade", key: "publicidade", stepIndex: 6 },
    { title: "8. Marketing", key: "marketing", stepIndex: 7 },
    { title: "9. Tecnologia & Automações", key: "tecnologiaAutomacoes", stepIndex: 8 },
    { title: "10. Habilidades Complementares", key: "habilidadesComplementares", stepIndex: 9 },
    { title: "11. Soft Skills", key: "softSkills", stepIndex: 10 },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            Resumo do Questionário
          </CardTitle>
          <p className="text-muted-foreground mt-2 font-medium text-lg">
            Revise o questionário preenchido e, em caso de revisão, retorne à questão desejada.
          </p>
          <div className="mt-4 p-3 bg-inclusive-orange/10 rounded-md border border-inclusive-orange/50">
            <p className="text-sm font-semibold text-inclusive-orange">
              ⚠️ Atenção: Antes de clicar em "Finalizar Questionário", verifique cuidadosamente todas as suas respostas. Utilize o botão "Voltar" abaixo para fazer qualquer ajuste necessário.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {sections.map(section => (
            <div 
              key={section.key} 
              className={cn(
                "p-4 border rounded-lg bg-muted/20 border-inclusive-purple/30 cursor-pointer transition-colors hover:bg-muted/50",
              )}
              onClick={() => onNavigateToStep(section.stepIndex)}
            >
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h3 className="text-xl font-bold text-inclusive-purple">
                  {section.title}
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-inclusive-purple hover:bg-inclusive-purple/10">
                    <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Exibição resumida dos dados da seção */}
              <div className="space-y-1">
                {renderData(formData[section.key as keyof QuestionnaireSchema])}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStep;
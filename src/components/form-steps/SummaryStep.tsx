import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionnaireSchema } from "@/schemas/questionnaireSchema";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SummaryStepProps {
  onNavigateToStep: (stepIndex: number, isReviewing: boolean) => void;
}

const formatKey = (key: string) => {
  // Converte camelCase para texto com espaços e capitaliza a primeira letra
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

// Componente recursivo para renderizar os dados e torná-los clicáveis
const RenderData: React.FC<{ data: any, level: number, stepIndex: number, onNavigate: (stepIndex: number) => void }> = ({ data, level, stepIndex, onNavigate }) => {
  if (!data || typeof data !== 'object') return null;

  return data && typeof data === 'object' && Object.keys(data).length > 0 ? Object.entries(data).map(([key, value]) => {
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
          <RenderData data={value} level={level + 1} stepIndex={stepIndex} onNavigate={onNavigate} />
        </div>
      );
    } else if (isNumber) {
      // Renderiza campos de slider (1-5) como itens clicáveis para navegação
      const displayValue = value;
      const valueClass = "font-bold text-inclusive-blue";
      
      return (
        <div 
          key={key} 
          className={cn(
            "text-sm text-foreground mt-1 flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-inclusive-blue/10 group",
            level > 0 ? 'ml-2' : ''
          )}
          onClick={() => onNavigate(stepIndex)}
        >
          <span className="font-medium text-muted-foreground group-hover:text-foreground">{formattedKey}:</span>{" "}
          <span className="flex items-center space-x-2">
            <span className={valueClass}>{displayValue}</span>
            <Pencil className="h-3 w-3 text-inclusive-blue opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </div>
      );
    }
    return null;
  }) : [];
};

const SummaryStep: React.FC<SummaryStepProps> = ({ onNavigateToStep }) => {
  const { getValues } = useFormContext<QuestionnaireSchema>();
  const formData = getValues();
  const [openSection, setOpenSection] = useState<string | undefined>(undefined);

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

  const handleNavigate = (stepIndex: number) => {
    // Navega para a etapa de edição e ativa o modo de revisão
    onNavigateToStep(stepIndex, true);
  };

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
              ⚠️ Atenção: Clique no título da seção para expandir e ver suas respostas. Clique em qualquer resposta para retornar à edição.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={openSection}
            onValueChange={(value) => setOpenSection(value === openSection ? undefined : value)}
          >
            {sections && sections.length > 0 ? sections.map(section => (
              <AccordionItem 
                key={section.key} 
                value={section.key}
                className="border rounded-lg bg-muted/20 border-inclusive-purple/30 mb-4"
              >
                <AccordionTrigger className="p-4 hover:no-underline">
                  <h3 className="text-xl font-bold text-inclusive-purple">
                    {section.title}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <div className="space-y-1">
                    <RenderData 
                      data={formData[section.key as keyof QuestionnaireSchema]} 
                      level={0} 
                      stepIndex={section.stepIndex}
                      onNavigate={handleNavigate}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma seção disponível
              </div>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStep;
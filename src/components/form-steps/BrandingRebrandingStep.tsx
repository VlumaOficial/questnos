import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BrandingRebrandingStepProps {
  onNext: () => void;
  onBack: () => void;
}

const BrandingRebrandingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            1. Branding & Rebranding
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e experiências relevantes nesta área.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="1.1 Estratégia de Marca"
            pathPrefix="brandingRebranding.estrategiaDeMarca"
            fields={[
              { name: "desenvolvimentoIdentidadeVisual", label: "Desenvolvimento de identidade visual", type: "checkbox" },
              { name: "criacaoNamingTaglines", label: "Criação de naming e taglines", type: "checkbox" },
              { name: "arquiteturaMarca", label: "Arquitetura de marca", type: "checkbox" },
              { name: "posicionamentoEstrategico", label: "Posicionamento estratégico", type: "checkbox" },
              { name: "brandGuidelinesManuais", label: "Brand guidelines e manuais de marca", type: "checkbox" },
              { name: "pesquisaMercadoPersonas", label: "Pesquisa de mercado e personas", type: "checkbox" },
              { name: "analiseConcorrencia", label: "Análise de concorrência", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-purple/30"
            headerClassName="bg-inclusive-purple/5"
            titleClassName="text-inclusive-purple"
          />

          <FormSection
            title="1.2 Rebranding"
            pathPrefix="brandingRebranding.rebranding"
            fields={[
              { name: "auditoriaMarcaExistente", label: "Auditoria de marca existente", type: "checkbox" },
              { name: "estrategiaTransicaoMarca", label: "Estratégia de transição de marca", type: "checkbox" },
              { name: "gestaoMudancaOrganizacional", label: "Gestão de mudança organizacional", type: "checkbox" },
              { name: "comunicacaoRebranding", label: "Comunicação de rebranding", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-purple/30"
            headerClassName="bg-inclusive-purple/5"
            titleClassName="text-inclusive-purple"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingRebrandingStep;
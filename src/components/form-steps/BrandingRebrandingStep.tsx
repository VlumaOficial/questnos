import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const BrandingRebrandingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            1. Branding & Rebranding
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e experiência relevante nesta área.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="1.1 Estratégia de Marca"
            pathPrefix="brandingRebranding.estrategiaDeMarca"
            fields={[
              { name: "desenvolvimentoIdentidadeVisual", label: "Desenvolvimento de identidade visual", ...sliderProps },
              { name: "criacaoNamingTaglines", label: "Criação de naming e taglines", ...sliderProps },
              { name: "arquiteturaMarca", label: "Arquitetura de marca", ...sliderProps },
              { name: "posicionamentoEstrategico", label: "Posicionamento estratégico", ...sliderProps },
              { name: "brandGuidelinesManuais", label: "Brand guidelines e manuais de marca", ...sliderProps },
              { name: "pesquisaMercadoPersonas", label: "Pesquisa de mercado e personas", ...sliderProps },
              { name: "analiseConcorrencia", label: "Análise de concorrência", ...sliderProps },
            ]}
            cardClassName="border-inclusive-purple/30"
            headerClassName="bg-inclusive-purple/5"
            titleClassName="text-inclusive-purple"
          />

          <FormSection
            title="1.2 Rebranding"
            pathPrefix="brandingRebranding.rebranding"
            fields={[
              { name: "auditoriaMarcaExistente", label: "Auditoria de marca existente", ...sliderProps },
              { name: "estrategiaTransicaoMarca", label: "Estratégia de transição de marca", ...sliderProps },
              { name: "gestaoMudancaOrganizacional", label: "Gestão de mudança organizacional", ...sliderProps },
              { name: "comunicacaoRebranding", label: "Comunicação de rebranding", ...sliderProps },
            ]}
            cardClassName="border-inclusive-purple/30"
            headerClassName="bg-inclusive-purple/5"
            titleClassName="text-inclusive-purple"
          />
          
          <FormSection
            title="Nível geral em Branding & Rebranding"
            pathPrefix="brandingRebranding"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
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
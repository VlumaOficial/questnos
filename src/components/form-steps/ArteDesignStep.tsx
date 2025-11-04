import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArteDesignStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            4. Arte & Design
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Arte/Design.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="4.1 Design Gráfico"
            pathPrefix="arteDesign.designGrafico"
            fields={[
              { name: "adobePhotoshop", label: "Adobe Photoshop", type: "checkbox" },
              { name: "adobeIllustrator", label: "Adobe Illustrator", type: "checkbox" },
              { name: "adobeInDesign", label: "Adobe InDesign", type: "checkbox" },
              { name: "figma", label: "Figma", type: "checkbox" },
              { name: "canvaPro", label: "Canva Pro", type: "checkbox" },
              { name: "corelDRAW", label: "CorelDRAW", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="4.2 Habilidades Criativas"
            pathPrefix="arteDesign.habilidadesCriativas"
            fields={[
              { name: "teoriaCores", label: "Teoria das cores", type: "checkbox" },
              { name: "tipografia", label: "Tipografia", type: "checkbox" },
              { name: "composicaoVisual", label: "Composição visual", type: "checkbox" },
              { name: "ilustracaoDigital", label: "Ilustração digital", type: "checkbox" },
              { name: "manipulacaoImagens", label: "Manipulação de imagens", type: "checkbox" },
              { name: "motionGraphicsBasico", label: "Motion graphics básico", type: "checkbox" },
              { name: "designApresentacoes", label: "Design de apresentações", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="4.3 Materiais"
            pathPrefix="arteDesign.materiais"
            fields={[
              { name: "pecasRedesSociais", label: "Peças para redes sociais", type: "checkbox" },
              { name: "bannersOutdoors", label: "Banners e outdoors", type: "checkbox" },
              { name: "materiaisImpressos", label: "Materiais impressos (cartões, folders)", type: "checkbox" },
              { name: "embalagens", label: "Embalagens", type: "checkbox" },
              { name: "identidadeVisualCompleta", label: "Identidade visual completa", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="Nível geral em Arte/Design"
            pathPrefix="arteDesign"
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

export default ArteDesignStep;
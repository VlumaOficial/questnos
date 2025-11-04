import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const ArteDesignStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            4. Arte & Design
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Arte/Design.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="4.1 Design Gráfico"
            pathPrefix="arteDesign.designGrafico"
            fields={[
              { name: "adobePhotoshop", label: "Adobe Photoshop", ...sliderProps },
              { name: "adobeIllustrator", label: "Adobe Illustrator", ...sliderProps },
              { name: "adobeInDesign", label: "Adobe InDesign", ...sliderProps },
              { name: "figma", label: "Figma", ...sliderProps },
              { name: "canvaPro", label: "Canva Pro", ...sliderProps },
              { name: "corelDRAW", label: "CorelDRAW", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="4.2 Habilidades Criativas"
            pathPrefix="arteDesign.habilidadesCriativas"
            fields={[
              { name: "teoriaCores", label: "Teoria das cores", ...sliderProps },
              { name: "tipografia", label: "Tipografia", ...sliderProps },
              { name: "composicaoVisual", label: "Composição visual", ...sliderProps },
              { name: "ilustracaoDigital", label: "Ilustração digital", ...sliderProps },
              { name: "manipulacaoImagens", label: "Manipulação de imagens", ...sliderProps },
              { name: "motionGraphicsBasico", label: "Motion graphics básico", ...sliderProps },
              { name: "designApresentacoes", label: "Design de apresentações", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="4.3 Materiais"
            pathPrefix="arteDesign.materiais"
            fields={[
              { name: "pecasRedesSociais", label: "Peças para redes sociais", ...sliderProps },
              { name: "bannersOutdoors", label: "Banners e outdoors", ...sliderProps },
              { name: "materiaisImpressos", label: "Materiais impressos (cartões, folders)", ...sliderProps },
              { name: "embalagens", label: "Embalagens", ...sliderProps },
              { name: "identidadeVisualCompleta", label: "Identidade visual completa", ...sliderProps },
            ]}
            cardClassName="border-inclusive-blue/30"
            headerClassName="bg-inclusive-blue/5"
            titleClassName="text-inclusive-blue"
          />

          <FormSection
            title="Nível geral em Arte/Design"
            pathPrefix="arteDesign"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
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
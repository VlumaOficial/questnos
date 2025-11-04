import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const CopywritingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            2. Copywriting
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Copywriting.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="2.1 Técnicas de Escrita"
            pathPrefix="copywriting.tecnicasDeEscrita"
            fields={[
              { name: "headlinesTitulosPersuasivos", label: "Headlines e títulos persuasivos", ...sliderProps },
              { name: "callToActionEfetivos", label: "Call-to-action (CTA) efetivos", ...sliderProps },
              { name: "storytellingComercial", label: "Storytelling comercial", ...sliderProps },
              { name: "copywritingConversao", label: "Copywriting para conversão", ...sliderProps },
              { name: "seoCopywriting", label: "SEO copywriting", ...sliderProps },
              { name: "microcopyUxWriting", label: "Microcopy (UX writing)", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="2.2 Formatos"
            pathPrefix="copywriting.formatos"
            fields={[
              { name: "anunciosPagos", label: "Anúncios pagos (Meta Ads, Google Ads)", ...sliderProps },
              { name: "emailMarketing", label: "E-mail marketing", ...sliderProps },
              { name: "scriptsVideo", label: "Scripts para vídeo", ...sliderProps },
              { name: "copyRedesSociais", label: "Copy para redes sociais", ...sliderProps },
              { name: "salesPages", label: "Sales pages e páginas de vendas", ...sliderProps },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Copywriting"
            pathPrefix="copywriting"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", ...sliderProps },
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

export default CopywritingStep;
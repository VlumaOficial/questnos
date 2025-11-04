import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CopywritingStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            2. Copywriting
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Copywriting.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="2.1 Técnicas de Escrita"
            pathPrefix="copywriting.tecnicasDeEscrita"
            fields={[
              { name: "headlinesTitulosPersuasivos", label: "Headlines e títulos persuasivos", type: "checkbox" },
              { name: "callToActionEfetivos", label: "Call-to-action (CTA) efetivos", type: "checkbox" },
              { name: "storytellingComercial", label: "Storytelling comercial", type: "checkbox" },
              { name: "copywritingConversao", label: "Copywriting para conversão", type: "checkbox" },
              { name: "seoCopywriting", label: "SEO copywriting", type: "checkbox" },
              { name: "microcopyUxWriting", label: "Microcopy (UX writing)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="2.2 Formatos"
            pathPrefix="copywriting.formatos"
            fields={[
              { name: "anunciosPagos", label: "Anúncios pagos (Meta Ads, Google Ads)", type: "checkbox" },
              { name: "emailMarketing", label: "E-mail marketing", type: "checkbox" },
              { name: "scriptsVideo", label: "Scripts para vídeo", type: "checkbox" },
              { name: "copyRedesSociais", label: "Copy para redes sociais", type: "checkbox" },
              { name: "salesPages", label: "Sales pages e páginas de vendas", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-orange/30"
            headerClassName="bg-inclusive-orange/5"
            titleClassName="text-inclusive-orange"
          />

          <FormSection
            title="Nível geral em Copywriting"
            pathPrefix="copywriting"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", type: "slider", min: 1, max: 5, step: 1 },
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
import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RedacaoStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            3. Redação
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Selecione as habilidades e avalie seu nível geral em Redação.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="3.1 Conteúdo Editorial"
            pathPrefix="redacao.conteudoEditorial"
            fields={[
              { name: "artigosBlogSeo", label: "Artigos para blog/SEO", type: "checkbox" },
              { name: "pressReleases", label: "Press releases", type: "checkbox" },
              { name: "casosEstudo", label: "Casos de estudo", type: "checkbox" },
              { name: "ebooksWhitepapers", label: "Ebooks e whitepapers", type: "checkbox" },
              { name: "newsletters", label: "Newsletters", type: "checkbox" },
              { name: "roteirosScripts", label: "Roteiros e scripts", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="3.2 Tom e Voz"
            pathPrefix="redacao.tomVoz"
            fields={[
              { name: "adaptacaoLinguagemPublico", label: "Adaptação de linguagem por público", type: "checkbox" },
              { name: "redacaoTecnica", label: "Redação técnica", type: "checkbox" },
              { name: "redacaoCriativa", label: "Redação criativa", type: "checkbox" },
              { name: "revisaoEdicaoTextos", label: "Revisão e edição de textos", type: "checkbox" },
              { name: "gramaticaOrtografiaPtBr", label: "Gramática e ortografia (PT-BR)", type: "checkbox" },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="Nível geral em Redação"
            pathPrefix="redacao"
            fields={[
              { name: "nivelGeral", label: "Avalie seu nível geral (1-5)", type: "slider", min: 1, max: 5, step: 1 },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RedacaoStep;
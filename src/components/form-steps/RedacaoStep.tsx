import React from "react";
import FormSection from "@/components/FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sliderProps = { type: "slider", min: 1, max: 5, step: 1 };

const RedacaoStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl shadow-lg border-inclusive-blue">
        <CardHeader className="text-center bg-inclusive-purple/10">
          <CardTitle className="text-3xl font-bold text-inclusive-purple">
            3. Redação
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Avalie seu nível (1-5) em cada habilidade e seu nível geral em Redação.
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <FormSection
            title="3.1 Conteúdo Editorial"
            pathPrefix="redacao.conteudoEditorial"
            fields={[
              { name: "artigosBlogSeo", label: "Artigos para blog/SEO", ...sliderProps },
              { name: "pressReleases", label: "Press releases", ...sliderProps },
              { name: "casosEstudo", label: "Casos de estudo", ...sliderProps },
              { name: "ebooksWhitepapers", label: "Ebooks e whitepapers", ...sliderProps },
              { name: "newsletters", label: "Newsletters", ...sliderProps },
              { name: "roteirosScripts", label: "Roteiros e scripts", ...sliderProps },
            ]}
            cardClassName="border-inclusive-yellow/30"
            headerClassName="bg-inclusive-yellow/5"
            titleClassName="text-inclusive-yellow"
          />

          <FormSection
            title="3.2 Tom e Voz"
            pathPrefix="redacao.tomVoz"
            fields={[
              { name: "adaptacaoLinguagemPublico", label: "Adaptação de linguagem por público", ...sliderProps },
              { name: "redacaoTecnica", label: "Redação técnica", ...sliderProps },
              { name: "redacaoCriativa", label: "Redação criativa", ...sliderProps },
              { name: "revisaoEdicaoTextos", label: "Revisão e edição de textos", ...sliderProps },
              { name: "gramaticaOrtografiaPtBr", label: "Gramática e ortografia (PT-BR)", ...sliderProps },
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
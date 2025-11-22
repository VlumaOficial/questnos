import MultiStepQuestionnaire from "@/components/MultiStepQuestionnaire";
import CandidateForm from "@/components/CandidateForm";
import PersonalPresentationForm from "@/components/PersonalPresentationForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSavePersonalPresentation } from "@/hooks/useSupabase";
import type { PersonalPresentationData } from "@/types/database";
import React, { useState } from "react";

// Definindo o tipo para os dados do candidato
interface CandidateData {
  name: string;
  email: string;
  phone: string;
  areaOfExpertise: string;
  yearsOfExperience: number;
}

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'questionnaire' | 'presentation'>('form');
  const [candidateInfo, setCandidateInfo] = useState<CandidateData | null>(null);
  const [candidateId, setCandidateId] = useState<string | null>(null);

  const savePersonalPresentation = useSavePersonalPresentation();

  const handleCandidateFormSubmit = (data: CandidateData) => {
    setCandidateInfo(data);
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireSuccess = (candidateId: string) => {
    // Ir para a apresentação pessoal após o questionário
    setCandidateId(candidateId);
    setCurrentStep('presentation');
  };

  const handlePresentationSuccess = () => {
    // Voltar para a tela principal após sucesso completo
    window.location.href = '/';
  };

  const handleSkipPresentation = () => {
    // Permitir pular a apresentação pessoal
    handlePresentationSuccess();
  };

  const handlePresentationSubmit = async (data: PersonalPresentationData) => {
    if (!candidateId) return;
    
    try {
      await savePersonalPresentation.mutateAsync({
        candidateId,
        presentationData: data
      });
      handlePresentationSuccess();
    } catch (error) {
      console.error('Erro ao salvar apresentação pessoal:', error);
      // Aqui você pode adicionar um toast de erro se necessário
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {currentStep === 'form' && (
          <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Vamos nos conhecer!</h2>
              <p className="text-muted-foreground">
                Conte-nos um pouco sobre você para personalizarmos sua avaliação de competências.
              </p>
            </div>
            <CandidateForm onFormSubmitSuccess={handleCandidateFormSubmit} />
          </div>
        )}
        
        {currentStep === 'questionnaire' && candidateInfo && (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container mx-auto px-4 py-12">
              {/* Header do Questionário */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Avaliação de Competências
                </h2>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Olá, {candidateInfo.name}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
                  Estas perguntas nos ajudam a mapear suas competências profissionais e 
                  identificar seu perfil para oportunidades de crescimento.
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Responda com sinceridade para obtermos uma análise precisa do seu potencial.
                </p>
              </div>

              {/* Questionário */}
              <div className="max-w-3xl mx-auto">
                <MultiStepQuestionnaire 
                  candidateInfo={candidateInfo}
                  onBack={() => setCurrentStep('form')}
                  onSuccess={handleQuestionnaireSuccess}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 'presentation' && candidateInfo && candidateId && (
          <PersonalPresentationForm
            candidateName={candidateInfo.name}
            onSubmit={handlePresentationSubmit}
            onSkip={handleSkipPresentation}
          />
        )}
      </main>

      {currentStep === 'form' && <Footer />}
    </div>
  );
};

export default Assessment;

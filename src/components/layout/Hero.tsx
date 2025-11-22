import { ArrowRight, Sparkles, Users, Brain, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClientConfig } from "@/config/client";

interface HeroProps {
  onStartJourney: () => void;
}

export function Hero({ onStartJourney }: HeroProps) {
  const config = useClientConfig();
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-indigo-950/10" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:border-blue-700">
              <Sparkles className="w-4 h-4 mr-2" />
              {config.branding.tagline}
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {config.branding.heroTitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {config.branding.heroSubtitle}
            </p>
          </div>

          {/* Features - Soluções de RH com IA */}
          <div className="flex flex-wrap justify-center gap-4 py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Análise Inteligente</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium">Automação</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm font-medium">Gestão de Pessoas</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-sm font-medium">Crescimento</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button 
              onClick={onStartJourney}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Avaliação de Competências
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              🤖 Inteligente • 🔒 Seguro • ⚡ Rápido
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

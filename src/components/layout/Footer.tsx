import { Heart, Users, Mail, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TermsModal from "@/components/TermsModal";
import { useClientConfig, getContactInfo } from "@/config/client";

export function Footer() {
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const config = useClientConfig();
  const contactInfo = getContactInfo();

  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* Logo personalizado ou ícone padrão */}
              {config.company.logo !== '/logo.png' ? (
                <img 
                  src={config.company.logo} 
                  alt={`${config.company.name} Logo`}
                  className="w-8 h-8 rounded-lg object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="font-bold text-lg">{config.company.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {config.branding.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Feito com amor para todos</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Plataforma</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setShowHowItWorksModal(true)}
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Como funciona
              </button>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="block text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Privacidade
              </button>
            </div>
          </div>

          {/* Comunidade */}
          <div className="space-y-4">
            <h3 className="font-semibold">Comunidade</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Histórias
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Suporte
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold">Conecte-se</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-8 h-8"
                onClick={() => window.open(contactInfo.emailLink, '_blank')}
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>{contactInfo.email}</p>
              <p>{contactInfo.phone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 space-y-4">
          {/* Créditos Vluma */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Desenvolvido por</span>
            <a 
              href="https://vluma.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors group"
            >
              <img 
                src="/logo.png" 
                alt="Vluma" 
                className="h-6 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-semibold">Vluma</span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 {config.company.name}. Todos os direitos reservados. Construído com inclusão em mente.</p>
          </div>
        </div>
      </div>

      {/* Modais */}
      <TermsModal
        isOpen={showHowItWorksModal}
        onClose={() => setShowHowItWorksModal(false)}
        type="how-it-works"
      />
      <TermsModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        type="privacy"
      />
    </footer>
  );
}

import { Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useClientConfig, isFeatureEnabled } from "@/config/client";

export function Header() {
  const config = useClientConfig();
  
  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              {/* Logo personalizado ou ícone padrão */}
              {config.company.logo !== '/logo.png' ? (
                <img 
                  src={config.company.logo} 
                  alt={`${config.company.name} Logo`}
                  className="w-10 h-10 rounded-xl object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-brand">
                {config.company.name}
              </h1>
              <p className="text-xs text-muted-foreground">{config.branding.tagline}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isFeatureEnabled('aboutPage') && (
              <Link to="/about">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Sobre
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Comunidade
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Suporte
            </Button>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            {/* Espaço reservado para futuras ações */}
          </div>
        </div>
      </div>
    </header>
  );
}

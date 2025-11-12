/**
 * 📄 VISUALIZADOR DE POLÍTICAS PERSONALIZADAS
 * 
 * Componente para exibir políticas legais personalizadas
 * (Termos de Uso e Política de Privacidade)
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, FileText, Shield, X } from 'lucide-react';
import { generateCustomPolicy, type PolicyType } from '@/utils/policyGenerator';

interface PolicyViewerProps {
  type: PolicyType;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function PolicyViewer({ type, isOpen, onClose, title }: PolicyViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Títulos padrão
  const defaultTitles = {
    terms: 'Termos de Uso',
    privacy: 'Política de Privacidade'
  };

  const displayTitle = title || defaultTitles[type];
  const icon = type === 'terms' ? FileText : Shield;
  const Icon = icon;

  // Carregar conteúdo quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      loadPolicyContent();
    }
  }, [isOpen, type]);

  const loadPolicyContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const policyContent = await generateCustomPolicy(type);
      setContent(policyContent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar política';
      setError(errorMessage);
      
      // Conteúdo de fallback
      setContent(`# ${displayTitle}

Erro ao carregar o conteúdo da política. Por favor, tente novamente mais tarde.

Para dúvidas, entre em contato conosco.`);
    } finally {
      setLoading(false);
    }
  };

  // Converter markdown básico para HTML
  const formatContent = (markdown: string): string => {
    return markdown
      // Títulos
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-foreground">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-6 text-foreground">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2 mt-4 text-foreground">$1</h3>')
      
      // Negrito
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      
      // Listas
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      
      // Parágrafos
      .replace(/\n\n/g, '</p><p class="mb-3 text-muted-foreground leading-relaxed">')
      
      // Separadores
      .replace(/^---$/gim, '<hr class="my-6 border-border" />')
      
      // Wrap em parágrafos
      .replace(/^(?!<[h|l|s])/gm, '<p class="mb-3 text-muted-foreground leading-relaxed">')
      .replace(/(?<!>)$/gm, '</p>');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Icon className="w-6 h-6 text-brand-primary" />
            {displayTitle}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
                <p className="text-muted-foreground">Carregando política...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-12">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Erro ao carregar</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadPolicyContent}
                  className="mt-2"
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[60vh] p-6">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(content) 
                }}
              />
            </ScrollArea>
          )}
        </div>

        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Fechar
              </Button>
              <Button 
                size="sm" 
                onClick={() => window.print()}
                className="bg-brand-primary hover:bg-brand-primary/90"
              >
                Imprimir
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook para usar o PolicyViewer
 */
export function usePolicyViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<PolicyType>('terms');

  const openPolicy = (type: PolicyType) => {
    setCurrentType(type);
    setIsOpen(true);
  };

  const closePolicy = () => {
    setIsOpen(false);
  };

  const PolicyViewerComponent = () => (
    <PolicyViewer
      type={currentType}
      isOpen={isOpen}
      onClose={closePolicy}
    />
  );

  return {
    openPolicy,
    closePolicy,
    PolicyViewer: PolicyViewerComponent,
    isOpen,
    currentType
  };
}

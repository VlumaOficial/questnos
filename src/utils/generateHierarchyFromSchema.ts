// Script para gerar hierarquia automaticamente do questionnaireSchema
import { questionnaireSchema } from '@/schemas/questionnaireSchema';
import type { Subject, Skill, SubSkill } from './subjectHierarchy';

// Labels amigáveis para as matérias
const SUBJECT_LABELS: Record<string, string> = {
  brandingRebranding: 'Branding & Rebranding',
  copywriting: 'Copywriting',
  redacao: 'Redação',
  arteDesign: 'Arte & Design',
  midiaSocial: 'Mídia Social',
  landingPages: 'Landing Pages',
  publicidade: 'Publicidade',
  marketing: 'Marketing',
  tecnologiaAutomacoes: 'Tecnologia & Automações',
  habilidadesComplementares: 'Habilidades Complementares',
  softSkills: 'Soft Skills',
};

// Labels amigáveis para habilidades
const SKILL_LABELS: Record<string, string> = {
  // Branding
  estrategiaDeMarca: 'Estratégia de Marca',
  rebranding: 'Rebranding',
  
  // Copywriting
  tecnicasDeEscrita: 'Técnicas de Escrita',
  formatos: 'Formatos',
  
  // Redação
  conteudoEditorial: 'Conteúdo Editorial',
  tomVoz: 'Tom e Voz',
  
  // Arte & Design
  designGrafico: 'Design Gráfico',
  habilidadesCriativas: 'Habilidades Criativas',
  materiais: 'Materiais',
  
  // Mídia Social
  plataformas: 'Plataformas',
  gestao: 'Gestão',
  ferramentas: 'Ferramentas',
  
  // Landing Pages
  desenvolvimento: 'Desenvolvimento',
  otimizacao: 'Otimização',
  integracoes: 'Integrações',
  
  // Publicidade
  midiaPaga: 'Mídia Paga',
  estrategia: 'Estratégia',
  creative: 'Creative',
  
  // Marketing
  marketingDigital: 'Marketing Digital',
  analiseDados: 'Análise de Dados',
  automacao: 'Automação',
  
  // Tecnologia & Automações
  infraestruturaTecnologica: 'Infraestrutura Tecnológica',
  desenvolvimentoWeb: 'Desenvolvimento Web',
  cmsPlataformas: 'CMS e Plataformas',
  automacaoMarketing: 'Automação de Marketing',
  automacaoProcessosNoCodeLowCode: 'Automação de Processos (No-Code/Low-Code)',
  automacaoRedesSociais: 'Automação de Redes Sociais',
  crmGestaoClientes: 'CRM e Gestão de Clientes',
  automacaoWhatsappBusiness: 'Automação de WhatsApp Business',
  iaFerramentasInteligentes: 'IA e Ferramentas Inteligentes',
  automacaoRelatorios: 'Automação de Relatórios',
  ferramentasColaboracao: 'Ferramentas de Colaboração',
  ecommercePagamentos: 'E-commerce e Pagamentos',
  automacaoEmail: 'Automação de E-mail',
  ferramentasProdutividade: 'Ferramentas de Produtividade',
  seoTecnicoFerramentas: 'SEO Técnico e Ferramentas',
  segurancaCompliance: 'Segurança e Compliance',
  analyticsTagManagement: 'Analytics e Tag Management',
  automacaoPropostasContratos: 'Automação de Propostas e Contratos',
  gestaoFinanceiraAutomatizada: 'Gestão Financeira Automatizada',
  backupRecuperacao: 'Backup e Recuperação',
  
  // Habilidades Complementares
  gestaoProjetos: 'Gestão de Projetos',
  atendimentoCliente: 'Atendimento ao Cliente',
  outrasSkills: 'Outras Skills',
};

// Função para converter camelCase em label legível
function camelToLabel(str: string): string {
  // Verificar se existe label customizado
  if (SKILL_LABELS[str]) return SKILL_LABELS[str];
  
  // Converter camelCase para espaços
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Gerar hierarquia completa do schema
export function generateHierarchyFromSchema(): Subject[] {
  const subjects: Subject[] = [];
  const schemaShape = questionnaireSchema.shape;

  // Iterar sobre cada matéria no schema
  Object.keys(schemaShape).forEach((subjectKey) => {
    const subjectSchema = schemaShape[subjectKey];
    
    // Verificar se é um objeto Zod
    if (!subjectSchema || typeof subjectSchema !== 'object' || !('shape' in subjectSchema)) {
      return;
    }

    const skills: Skill[] = [];
    const subjectShape = (subjectSchema as any).shape;

    // Soft Skills tem estrutura diferente (não tem sub-objetos)
    if (subjectKey === 'softSkills') {
      const subSkills: SubSkill[] = [];
      
      Object.keys(subjectShape).forEach((skillKey) => {
        subSkills.push({
          id: skillKey,
          label: camelToLabel(skillKey),
          questionPath: `${subjectKey}.${skillKey}`,
        });
      });

      skills.push({
        id: 'softSkillsGeral',
        label: 'Competências Comportamentais',
        subSkills,
      });
    } else {
      // Para outras matérias, iterar sobre habilidades
      Object.keys(subjectShape).forEach((skillKey) => {
        const skillSchema = subjectShape[skillKey];
        
        // Verificar se é um objeto Zod com sub-habilidades
        if (!skillSchema || typeof skillSchema !== 'object' || !('shape' in skillSchema)) {
          return;
        }

        const subSkills: SubSkill[] = [];
        const skillShape = (skillSchema as any).shape;

        // Iterar sobre sub-habilidades
        Object.keys(skillShape).forEach((subSkillKey) => {
          subSkills.push({
            id: subSkillKey,
            label: camelToLabel(subSkillKey),
            questionPath: `${subjectKey}.${skillKey}.${subSkillKey}`,
          });
        });

        if (subSkills.length > 0) {
          skills.push({
            id: skillKey,
            label: SKILL_LABELS[skillKey] || camelToLabel(skillKey),
            subSkills,
          });
        }
      });
    }

    if (skills.length > 0) {
      subjects.push({
        id: subjectKey,
        label: SUBJECT_LABELS[subjectKey] || camelToLabel(subjectKey),
        skills,
      });
    }
  });

  return subjects;
}

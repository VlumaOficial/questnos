// Mapeamento da estrutura hierárquica do questionário
// GERADO DINAMICAMENTE do questionnaireSchema.ts

import { generateHierarchyFromSchema } from './generateHierarchyFromSchema';

export interface SubSkill {
  id: string;
  label: string;
  questionPath: string;
}

export interface Skill {
  id: string;
  label: string;
  subSkills: SubSkill[];
}

export interface Subject {
  id: string;
  label: string;
  skills: Skill[];
}

// Gerar hierarquia completa do schema
export const SUBJECT_HIERARCHY: Subject[] = generateHierarchyFromSchema();

// Função auxiliar para obter classificação de nível
// IMPORTANTE: Valores vão de 1 a 5 (não existe zero)
// Nível 1: 1.00 a 1.99 - Sem conhecimento
// Nível 2: 2.00 a 2.99 - Conhecimento básico
// Nível 3: 3.00 a 3.99 - Conhecimento intermediário
// Nível 4: 4.00 a 4.99 - Conhecimento avançado
// Nível 5: 5.00 - Especialista/Expert
export function getLevelClassification(avgScore: number): {
  level: number;
  label: string;
  color: string;
  bgColor: string;
} {
  // Garantir que o score está no range válido (1-5)
  const validScore = Math.max(1, Math.min(5, avgScore));
  
  if (validScore === 5.0) {
    return {
      level: 5,
      label: 'Especialista/Expert',
      color: 'text-purple-800',
      bgColor: 'bg-purple-100 border-purple-200',
    };
  }
  if (validScore >= 4.0) {
    return {
      level: 4,
      label: 'Conhecimento Avançado',
      color: 'text-green-800',
      bgColor: 'bg-green-100 border-green-200',
    };
  }
  if (validScore >= 3.0) {
    return {
      level: 3,
      label: 'Conhecimento Intermediário',
      color: 'text-yellow-800',
      bgColor: 'bg-yellow-100 border-yellow-200',
    };
  }
  if (validScore >= 2.0) {
    return {
      level: 2,
      label: 'Conhecimento Básico',
      color: 'text-orange-800',
      bgColor: 'bg-orange-100 border-orange-200',
    };
  }
  // Nível 1: de 1.00 a 1.99
  return {
    level: 1,
    label: 'Sem Conhecimento',
    color: 'text-red-800',
    bgColor: 'bg-red-100 border-red-200',
  };
}

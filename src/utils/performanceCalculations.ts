// Funções para cálculo de desempenho por matéria, habilidade e sub-habilidade

import { SUBJECT_HIERARCHY, type Subject, type Skill, type SubSkill } from './subjectHierarchy';

export interface AnswerData {
  question_text: string;
  answer_score: number;
  answer_value: string;
}

export interface SubSkillPerformance {
  subSkill: SubSkill;
  score: number;
  answers: AnswerData[];
}

export interface SkillPerformance {
  skill: Skill;
  avgScore: number;
  subSkillsPerformance: SubSkillPerformance[];
}

export interface SubjectPerformance {
  subject: Subject;
  avgScore: number;
  skillsPerformance: SkillPerformance[];
}

/**
 * Extrai o valor de uma questão específica do objeto de respostas
 */
function getQuestionValue(answers: any[], questionPath: string): number {
  // Procurar pela resposta que corresponde ao caminho da questão
  const answer = answers.find((a) => {
    // O question_text geralmente contém o caminho completo separado por ":"
    // Ex: "brandingRebranding: estrategiaDeMarca: desenvolvimentoIdentidadeVisual"
    const normalizedQuestionText = a.question_text
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/:/g, '.');
    const normalizedPath = questionPath.toLowerCase().replace(/\s+/g, '');
    
    return normalizedQuestionText.includes(normalizedPath) || 
           normalizedPath.includes(normalizedQuestionText);
  });

  return answer?.answer_score || 0;
}

/**
 * Calcula o desempenho de uma sub-habilidade
 */
function calculateSubSkillPerformance(
  subSkill: SubSkill,
  answers: any[]
): SubSkillPerformance {
  const score = getQuestionValue(answers, subSkill.questionPath);
  
  // Buscar respostas relacionadas
  const relatedAnswers = answers.filter((a) => {
    const normalizedQuestionText = a.question_text
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/:/g, '.');
    const normalizedPath = subSkill.questionPath.toLowerCase().replace(/\s+/g, '');
    
    return normalizedQuestionText.includes(normalizedPath) || 
           normalizedPath.includes(normalizedQuestionText);
  });

  return {
    subSkill,
    score,
    answers: relatedAnswers,
  };
}

/**
 * Calcula o desempenho de uma habilidade (média simples das sub-habilidades)
 */
function calculateSkillPerformance(
  skill: Skill,
  answers: any[]
): SkillPerformance {
  const subSkillsPerformance = skill.subSkills.map((subSkill) =>
    calculateSubSkillPerformance(subSkill, answers)
  );

  // Média simples (sem peso)
  const totalScore = subSkillsPerformance.reduce((sum, sp) => sum + sp.score, 0);
  const avgScore = subSkillsPerformance.length > 0 
    ? totalScore / subSkillsPerformance.length 
    : 0;

  return {
    skill,
    avgScore,
    subSkillsPerformance,
  };
}

/**
 * Calcula o desempenho de uma matéria (média simples das habilidades)
 */
export function calculateSubjectPerformance(
  subject: Subject,
  answers: any[]
): SubjectPerformance {
  const skillsPerformance = subject.skills.map((skill) =>
    calculateSkillPerformance(skill, answers)
  );

  // Média simples (sem peso)
  const totalScore = skillsPerformance.reduce((sum, sp) => sum + sp.avgScore, 0);
  const avgScore = skillsPerformance.length > 0 
    ? totalScore / skillsPerformance.length 
    : 0;

  return {
    subject,
    avgScore,
    skillsPerformance,
  };
}

/**
 * Calcula o desempenho de todas as matérias
 */
export function calculateAllSubjectsPerformance(
  answers: any[]
): SubjectPerformance[] {
  return SUBJECT_HIERARCHY.map((subject) =>
    calculateSubjectPerformance(subject, answers)
  );
}

/**
 * Calcula o desempenho geral (média de todas as matérias)
 */
export function calculateOverallPerformance(answers: any[]): number {
  const subjectsPerformance = calculateAllSubjectsPerformance(answers);
  
  const totalScore = subjectsPerformance.reduce((sum, sp) => sum + sp.avgScore, 0);
  const avgScore = subjectsPerformance.length > 0 
    ? totalScore / subjectsPerformance.length 
    : 0;

  return avgScore;
}

/**
 * Filtra respostas por candidato
 */
export function filterAnswersByCandidate(
  allAnswers: any[],
  candidateId: string
): any[] {
  return allAnswers.filter((answer) => answer.candidate_id === candidateId);
}

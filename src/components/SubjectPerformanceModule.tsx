import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { getLevelClassification } from '@/utils/subjectHierarchy';
import type { SubjectPerformance, SkillPerformance, SubSkillPerformance } from '@/utils/performanceCalculations';

interface SubjectPerformanceModuleProps {
  subjectsPerformance: SubjectPerformance[];
  candidateName?: string;
}

export default function SubjectPerformanceModule({ 
  subjectsPerformance,
  candidateName 
}: SubjectPerformanceModuleProps) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [selectedSubSkill, setSelectedSubSkill] = useState<SubSkillPerformance | null>(null);

  // Toggle de matéria - recolhe outras matérias automaticamente
  const toggleSubject = (subjectId: string) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
      setExpandedSkill(null);
    } else {
      setExpandedSubject(subjectId);
      setExpandedSkill(null); // Recolhe habilidades ao trocar de matéria
    }
  };

  // Toggle de habilidade
  const toggleSkill = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  // Abrir modal de sub-habilidade
  const openSubSkillModal = (subSkillPerf: SubSkillPerformance) => {
    setSelectedSubSkill(subSkillPerf);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Desempenho por Matéria
            {candidateName && (
              <Badge variant="outline" className="ml-2">
                {candidateName}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {candidateName 
              ? 'Análise detalhada do desempenho individual por matéria, habilidade e sub-habilidade'
              : 'Visão geral do desempenho de todos os candidatos por matéria'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subjectsPerformance.map((subjectPerf) => {
              const subjectLevel = getLevelClassification(subjectPerf.avgScore);
              const isSubjectExpanded = expandedSubject === subjectPerf.subject.id;

              return (
                <div key={subjectPerf.subject.id} className="border rounded-lg overflow-hidden">
                  {/* MATÉRIA */}
                  <button
                    onClick={() => toggleSubject(subjectPerf.subject.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isSubjectExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{subjectPerf.subject.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subjectPerf.subject.skills.length} habilidade(s)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${subjectLevel.bgColor} ${subjectLevel.color} border`}>
                        Nível {subjectLevel.level} - {subjectLevel.label}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">
                        {subjectPerf.avgScore.toFixed(2)}
                      </span>
                    </div>
                  </button>

                  {/* HABILIDADES (expandido) */}
                  {isSubjectExpanded && (
                    <div className="border-t bg-muted/20">
                      {subjectPerf.skillsPerformance.map((skillPerf) => {
                        const skillLevel = getLevelClassification(skillPerf.avgScore);
                        const isSkillExpanded = expandedSkill === skillPerf.skill.id;

                        return (
                          <div key={skillPerf.skill.id} className="border-b last:border-b-0">
                            {/* HABILIDADE */}
                            <button
                              onClick={() => toggleSkill(skillPerf.skill.id)}
                              className="w-full p-3 pl-12 flex items-center justify-between hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {isSkillExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}
                                <div className="text-left">
                                  <h4 className="font-medium">{skillPerf.skill.label}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {skillPerf.skill.subSkills.length} sub-habilidade(s)
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${skillLevel.bgColor} ${skillLevel.color} border text-xs`}>
                                  Nível {skillLevel.level}
                                </Badge>
                                <span className="text-xs font-medium text-muted-foreground">
                                  {skillPerf.avgScore.toFixed(2)}
                                </span>
                              </div>
                            </button>

                            {/* SUB-HABILIDADES (expandido) */}
                            {isSkillExpanded && (
                              <div className="bg-background">
                                {skillPerf.subSkillsPerformance.map((subSkillPerf) => {
                                  const subSkillLevel = getLevelClassification(subSkillPerf.score);

                                  return (
                                    <button
                                      key={subSkillPerf.subSkill.id}
                                      onClick={() => openSubSkillModal(subSkillPerf)}
                                      className="w-full p-2 pl-20 flex items-center justify-between hover:bg-accent/30 transition-colors text-left"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Eye className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-sm">{subSkillPerf.subSkill.label}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge 
                                          variant="outline" 
                                          className={`${subSkillLevel.bgColor} ${subSkillLevel.color} text-xs`}
                                        >
                                          Nível {subSkillLevel.level}
                                        </Badge>
                                        <span className="text-xs font-medium text-muted-foreground min-w-[40px] text-right">
                                          {subSkillPerf.score.toFixed(2)}
                                        </span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {subjectsPerformance.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado de desempenho disponível
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MODAL DE RESPOSTAS DA SUB-HABILIDADE */}
      <Dialog open={!!selectedSubSkill} onOpenChange={() => setSelectedSubSkill(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Respostas Detalhadas
            </DialogTitle>
            <DialogDescription>
              {selectedSubSkill?.subSkill.label}
            </DialogDescription>
          </DialogHeader>

          {selectedSubSkill && (
            <div className="space-y-4">
              {/* Nível da Sub-habilidade */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Nível de Conhecimento:</span>
                  <Badge 
                    className={`${getLevelClassification(selectedSubSkill.score).bgColor} ${getLevelClassification(selectedSubSkill.score).color} border`}
                  >
                    Nível {getLevelClassification(selectedSubSkill.score).level} - {getLevelClassification(selectedSubSkill.score).label}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pontuação:</span>
                  <span className="text-2xl font-bold">{selectedSubSkill.score.toFixed(2)}</span>
                </div>
              </div>

              {/* Respostas */}
              <div>
                <h4 className="font-semibold mb-3">Respostas do Candidato:</h4>
                {selectedSubSkill.answers.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSubSkill.answers.map((answer, index) => (
                      <div 
                        key={index}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{answer.question_text}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Resposta: {answer.answer_value}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {answer.answer_score.toFixed(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground border rounded-lg">
                    Nenhuma resposta encontrada para esta sub-habilidade
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

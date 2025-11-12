/**
 * 📝 SERVIÇO DE QUESTIONÁRIOS
 * 
 * Integração com as tabelas de questionários dinâmicos
 * para gerenciar matérias, submatérias e perguntas.
 */

import { supabase } from '@/lib/supabase';

export interface DynamicQuestion {
  id: string;
  sub_subject_id: string;
  question_text: string;
  question_type: 'slider' | 'multiple_choice' | 'text';
  options?: any;
  order_index: number;
  is_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DynamicSubSubject {
  id: string;
  subject_id: string;
  name: string;
  description?: string;
  order_index: number;
  is_active: boolean;
  questions?: DynamicQuestion[];
  created_at: string;
  updated_at: string;
}

export interface DynamicSubject {
  id: string;
  name: string;
  description?: string;
  order_index: number;
  is_active: boolean;
  sub_subjects?: DynamicSubSubject[];
  created_at: string;
  updated_at: string;
}

class QuestionnaireService {
  /**
   * Obter estrutura completa do questionário
   */
  async getQuestionnaireStructure(): Promise<DynamicSubject[]> {
    try {
      const { data: subjects, error } = await supabase
        .from('dynamic_subjects')
        .select(`
          *,
          sub_subjects:dynamic_sub_subjects(
            *,
            questions:dynamic_questions(*)
          )
        `)
        .eq('is_active', true)
        .order('order_index');

      if (error) {
        console.error('Erro ao buscar estrutura:', error);
        return [];
      }

      return subjects || [];
    } catch (error) {
      console.error('Erro no getQuestionnaireStructure:', error);
      return [];
    }
  }

  /**
   * Criar nova matéria
   */
  async createSubject(data: Partial<DynamicSubject>): Promise<{ success: boolean; data?: DynamicSubject; error?: string }> {
    try {
      const { data: subject, error } = await supabase
        .from('dynamic_subjects')
        .insert(data)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('subject_created', subject.id, data);
      return { success: true, data: subject };
    } catch (error) {
      console.error('Erro no createSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Atualizar matéria
   */
  async updateSubject(id: string, data: Partial<DynamicSubject>): Promise<{ success: boolean; data?: DynamicSubject; error?: string }> {
    try {
      const { data: subject, error } = await supabase
        .from('dynamic_subjects')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('subject_updated', id, data);
      return { success: true, data: subject };
    } catch (error) {
      console.error('Erro no updateSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Deletar matéria
   */
  async deleteSubject(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('dynamic_subjects')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('subject_deleted', id, {});
      return { success: true };
    } catch (error) {
      console.error('Erro no deleteSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Criar nova submatéria
   */
  async createSubSubject(data: Partial<DynamicSubSubject>): Promise<{ success: boolean; data?: DynamicSubSubject; error?: string }> {
    try {
      const { data: subSubject, error } = await supabase
        .from('dynamic_sub_subjects')
        .insert(data)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('sub_subject_created', subSubject.id, data);
      return { success: true, data: subSubject };
    } catch (error) {
      console.error('Erro no createSubSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Atualizar submatéria
   */
  async updateSubSubject(id: string, data: Partial<DynamicSubSubject>): Promise<{ success: boolean; data?: DynamicSubSubject; error?: string }> {
    try {
      const { data: subSubject, error } = await supabase
        .from('dynamic_sub_subjects')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('sub_subject_updated', id, data);
      return { success: true, data: subSubject };
    } catch (error) {
      console.error('Erro no updateSubSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Deletar submatéria
   */
  async deleteSubSubject(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('dynamic_sub_subjects')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('sub_subject_deleted', id, {});
      return { success: true };
    } catch (error) {
      console.error('Erro no deleteSubSubject:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Criar nova pergunta
   */
  async createQuestion(data: Partial<DynamicQuestion>): Promise<{ success: boolean; data?: DynamicQuestion; error?: string }> {
    try {
      const { data: question, error } = await supabase
        .from('dynamic_questions')
        .insert(data)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('question_created', question.id, data);
      return { success: true, data: question };
    } catch (error) {
      console.error('Erro no createQuestion:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Atualizar pergunta
   */
  async updateQuestion(id: string, data: Partial<DynamicQuestion>): Promise<{ success: boolean; data?: DynamicQuestion; error?: string }> {
    try {
      const { data: question, error } = await supabase
        .from('dynamic_questions')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('question_updated', id, data);
      return { success: true, data: question };
    } catch (error) {
      console.error('Erro no updateQuestion:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Deletar pergunta
   */
  async deleteQuestion(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('dynamic_questions')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      await this.logActivity('question_deleted', id, {});
      return { success: true };
    } catch (error) {
      console.error('Erro no deleteQuestion:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  /**
   * Importar estrutura via Excel (simulado)
   */
  async importFromExcel(file: File): Promise<{ success: boolean; imported?: number; error?: string }> {
    try {
      // Aqui implementaria a lógica de parsing do Excel
      // Por enquanto, retorna sucesso simulado
      console.log('Importando arquivo:', file.name);
      
      // Simulação de importação bem-sucedida
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { success: true, imported: 25 };
    } catch (error) {
      console.error('Erro na importação:', error);
      return { success: false, error: 'Erro ao processar arquivo Excel' };
    }
  }

  /**
   * Exportar estrutura para Excel
   */
  async exportToExcel(): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const structure = await this.getQuestionnaireStructure();
      
      // Aqui implementaria a geração do Excel
      // Por enquanto, retorna sucesso simulado
      console.log('Exportando estrutura:', structure);
      
      return { success: true, url: '/exports/questionnaire.xlsx' };
    } catch (error) {
      console.error('Erro na exportação:', error);
      return { success: false, error: 'Erro ao gerar arquivo Excel' };
    }
  }

  /**
   * Reordenar itens
   */
  async reorderItems(type: 'subjects' | 'sub_subjects' | 'questions', items: { id: string; order_index: number }[]): Promise<{ success: boolean; error?: string }> {
    try {
      const tableName = type === 'subjects' ? 'dynamic_subjects' : 
                       type === 'sub_subjects' ? 'dynamic_sub_subjects' : 'dynamic_questions';

      for (const item of items) {
        await supabase
          .from(tableName)
          .update({ order_index: item.order_index })
          .eq('id', item.id);
      }

      await this.logActivity(`${type}_reordered`, '', { items });
      return { success: true };
    } catch (error) {
      console.error('Erro no reorderItems:', error);
      return { success: false, error: 'Erro ao reordenar itens' };
    }
  }

  /**
   * Validar estrutura do questionário
   */
  validateStructure(structure: DynamicSubject[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (structure.length === 0) {
      errors.push('Questionário deve ter pelo menos uma matéria');
    }

    structure.forEach((subject, subjectIndex) => {
      if (!subject.name || subject.name.trim().length === 0) {
        errors.push(`Matéria ${subjectIndex + 1} deve ter um nome`);
      }

      if (!subject.sub_subjects || subject.sub_subjects.length === 0) {
        errors.push(`Matéria "${subject.name}" deve ter pelo menos uma submatéria`);
      }

      subject.sub_subjects?.forEach((subSubject, subIndex) => {
        if (!subSubject.name || subSubject.name.trim().length === 0) {
          errors.push(`Submatéria ${subIndex + 1} da matéria "${subject.name}" deve ter um nome`);
        }

        if (!subSubject.questions || subSubject.questions.length === 0) {
          errors.push(`Submatéria "${subSubject.name}" deve ter pelo menos uma pergunta`);
        }

        subSubject.questions?.forEach((question, qIndex) => {
          if (!question.question_text || question.question_text.trim().length === 0) {
            errors.push(`Pergunta ${qIndex + 1} da submatéria "${subSubject.name}" deve ter um texto`);
          }
        });
      });
    });

    return { valid: errors.length === 0, errors };
  }

  /**
   * Log de atividade
   */
  private async logActivity(action: string, resourceId: string, details: any): Promise<void> {
    try {
      await supabase
        .from('activity_logs')
        .insert({
          action,
          resource_type: 'questionnaire',
          resource_id: resourceId,
          details: details,
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Erro ao registrar log:', error);
    }
  }
}

export const questionnaireService = new QuestionnaireService();

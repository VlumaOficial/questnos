/**
 * 📝 GERENCIAMENTO DE QUESTIONÁRIOS
 * 
 * Interface para configurar matérias, submatérias e perguntas
 * com suporte a importação de arquivos Excel.
 */

import { useState, useEffect } from 'react';
import { questionnaireService, type DynamicSubject, type DynamicSubSubject, type DynamicQuestion } from '@/services/questionnaireService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Save,
  FileSpreadsheet,
  BookOpen,
  HelpCircle,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export function AdminQuestionnaire() {
  const [subjects, setSubjects] = useState<DynamicSubject[]>([]);
  const [activeTab, setActiveTab] = useState('subjects');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importProgress, setImportProgress] = useState<{ importing: boolean; progress?: number }>({ importing: false });

  // Carregar dados existentes
  useEffect(() => {
    loadQuestionnaire();
  }, []);

  const loadQuestionnaire = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Carregar estrutura atual do banco de dados
      const structure = await questionnaireService.getQuestionnaireStructure();
      setSubjects(structure);
    } catch (error) {
      console.error('Erro ao carregar questionário:', error);
      setError('Erro ao carregar estrutura do questionário');
    } finally {
      setLoading(false);
    }
  };

  const handleExcelImport = async (file: File) => {
    setImportProgress({ importing: true, progress: 0 });
    setError(null);
    
    try {
      const result = await questionnaireService.importFromExcel(file);
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
        setImportProgress({ importing: false });
        // Mostrar sucesso
      } else {
        setError(result.error || 'Erro na importação');
        setImportProgress({ importing: false });
      }
    } catch (error) {
      console.error('Erro na importação:', error);
      setError('Erro interno na importação');
      setImportProgress({ importing: false });
    }
  };

  const exportToExcel = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const result = await questionnaireService.exportToExcel();
      
      if (result.success && result.url) {
        // Criar link de download
        const link = document.createElement('a');
        link.href = result.url;
        link.download = 'questionario.xlsx';
        link.click();
      } else {
        setError(result.error || 'Erro na exportação');
      }
    } catch (error) {
      console.error('Erro na exportação:', error);
      setError('Erro interno na exportação');
    } finally {
      setSaving(false);
    }
  };

  const addSubject = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const result = await questionnaireService.createSubject({
        name: 'Nova Matéria',
        description: '',
        order_index: subjects.length,
        is_active: true
      });
      
      if (result.success && result.data) {
        await loadQuestionnaire(); // Recarregar para pegar dados atualizados
        setEditingItem(result.data);
      } else {
        setError(result.error || 'Erro ao criar matéria');
      }
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
      setError('Erro interno ao criar matéria');
    } finally {
      setSaving(false);
    }
  };

  const addSubSubject = async (subjectId: string) => {
    setSaving(true);
    setError(null);
    
    try {
      const subject = subjects.find(s => s.id === subjectId);
      const result = await questionnaireService.createSubSubject({
        subject_id: subjectId,
        name: 'Nova Submatéria',
        description: '',
        order_index: subject?.sub_subjects?.length || 0,
        is_active: true
      });
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
      } else {
        setError(result.error || 'Erro ao criar submatéria');
      }
    } catch (error) {
      console.error('Erro ao criar submatéria:', error);
      setError('Erro interno ao criar submatéria');
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = async (subjectId: string, subSubjectId: string) => {
    setSaving(true);
    setError(null);
    
    try {
      const subject = subjects.find(s => s.id === subjectId);
      const subSubject = subject?.sub_subjects?.find(ss => ss.id === subSubjectId);
      
      const result = await questionnaireService.createQuestion({
        sub_subject_id: subSubjectId,
        question_text: 'Nova pergunta',
        question_type: 'slider',
        order_index: subSubject?.questions?.length || 0,
        is_required: true,
        is_active: true
      });
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
      } else {
        setError(result.error || 'Erro ao criar pergunta');
      }
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
      setError('Erro interno ao criar pergunta');
    } finally {
      setSaving(false);
    }
  };

  const deleteSubject = async (subjectId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta matéria e todas as suas submatérias?')) {
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const result = await questionnaireService.deleteSubject(subjectId);
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
      } else {
        setError(result.error || 'Erro ao excluir matéria');
      }
    } catch (error) {
      console.error('Erro ao excluir matéria:', error);
      setError('Erro interno ao excluir matéria');
    } finally {
      setSaving(false);
    }
  };

  const deleteSubSubject = async (subSubjectId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta submatéria e todas as suas perguntas?')) {
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const result = await questionnaireService.deleteSubSubject(subSubjectId);
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
      } else {
        setError(result.error || 'Erro ao excluir submatéria');
      }
    } catch (error) {
      console.error('Erro ao excluir submatéria:', error);
      setError('Erro interno ao excluir submatéria');
    } finally {
      setSaving(false);
    }
  };

  const deleteQuestion = async (questionId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta pergunta?')) {
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const result = await questionnaireService.deleteQuestion(questionId);
      
      if (result.success) {
        await loadQuestionnaire(); // Recarregar dados
      } else {
        setError(result.error || 'Erro ao excluir pergunta');
      }
    } catch (error) {
      console.error('Erro ao excluir pergunta:', error);
      setError('Erro interno ao excluir pergunta');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Questionário</h1>
          <p className="text-muted-foreground mt-2">
            Configure matérias, submatérias e perguntas do questionário
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={exportToExcel}
            disabled={saving || loading}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
          
          <Button 
            onClick={() => document.getElementById('excel-import')?.click()}
            disabled={saving || loading || importProgress.importing}
          >
            <Upload className="w-4 h-4 mr-2" />
            {importProgress.importing ? 'Importando...' : 'Importar Excel'}
          </Button>
          
          <input
            id="excel-import"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleExcelImport(file);
            }}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Alert className="mb-6">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <AlertDescription>
            Carregando estrutura do questionário...
          </AlertDescription>
        </Alert>
      )}

      {/* Error State */}
      {error && (
        <Alert className="mb-6 border-red-500 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Import Progress */}
      {importProgress.importing && (
        <Alert className="mb-6 border-blue-500 bg-blue-50">
          <Upload className="w-4 h-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Importando arquivo Excel... Por favor, aguarde.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="subjects">Matérias</TabsTrigger>
          <TabsTrigger value="import">Importação</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Estrutura do Questionário</CardTitle>
                  <CardDescription>
                    Gerencie matérias, submatérias e perguntas
                  </CardDescription>
                </div>
                <Button 
                  onClick={addSubject}
                  disabled={saving || loading}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Matéria
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <Card key={subject.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-blue-500" />
                          <div>
                            <h3 className="font-semibold">{subject.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {subject.sub_subjects?.length || 0} submatérias
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addSubSubject(subject.id)}
                            disabled={saving || loading}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Submatéria
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={saving || loading}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteSubject(subject.id)}
                            disabled={saving || loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {subject.sub_subjects && subject.sub_subjects.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-3 ml-8">
                          {subject.sub_subjects.map((subSubject) => (
                            <Card key={subSubject.id} className="border-l-2 border-l-green-400">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    <span className="font-medium">{subSubject.name}</span>
                                    <Badge variant="secondary">
                                      {subSubject.questions?.length || 0} perguntas
                                    </Badge>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => addQuestion(subject.id, subSubject.id)}
                                    >
                                      <Plus className="w-3 h-3 mr-1" />
                                      Pergunta
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                
                                {subSubject.questions.length > 0 && (
                                  <div className="space-y-2 ml-4">
                                    {subSubject.questions.map((question, index) => (
                                      <div key={question.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm flex-1">{question.text}</span>
                                        <div className="flex gap-1">
                                          <Button variant="ghost" size="sm">
                                            <Edit className="w-3 h-3" />
                                          </Button>
                                          <Button variant="ghost" size="sm">
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Importação via Excel
              </CardTitle>
              <CardDescription>
                Importe matérias e perguntas usando planilha Excel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <FileSpreadsheet className="w-4 h-4" />
                <AlertDescription>
                  <strong>Formato esperado:</strong> Coluna A = Matéria, Coluna B = Submatéria, Coluna C = Pergunta
                </AlertDescription>
              </Alert>
              
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Arraste seu arquivo Excel aqui</h3>
                <p className="text-muted-foreground mb-4">ou clique para selecionar</p>
                <Button onClick={() => document.getElementById('excel-import')?.click()}>
                  Selecionar Arquivo
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Exemplo de estrutura:</h4>
                <div className="bg-muted p-4 rounded font-mono text-sm">
                  <div>A1: Liderança | B1: Gestão de Pessoas | C1: Como você motiva sua equipe?</div>
                  <div>A2: Liderança | B2: Gestão de Pessoas | C2: Como resolve conflitos?</div>
                  <div>A3: Liderança | B3: Tomada de Decisão | C3: Como analisa riscos?</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview do Questionário</CardTitle>
              <CardDescription>
                Visualize como o questionário aparecerá para os candidatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.map((subject, subjectIndex) => (
                  <div key={subject.id} className="border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                      {subjectIndex + 1}. {subject.name}
                    </h2>
                    
                    {subject.subSubjects.map((subSubject, subIndex) => (
                      <div key={subSubject.id} className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-blue-600">
                          {subjectIndex + 1}.{subIndex + 1} {subSubject.name}
                        </h3>
                        
                        <div className="space-y-4">
                          {subSubject.questions.map((question, qIndex) => (
                            <div key={question.id} className="bg-muted/30 p-4 rounded">
                              <p className="font-medium mb-2">
                                {question.text}
                              </p>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(value => (
                                  <div key={value} className="flex flex-col items-center">
                                    <div className="w-8 h-8 border-2 border-border rounded-full" />
                                    <span className="text-xs mt-1">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

-- ============================================
-- CORRIGIR POLÍTICAS RLS PARA PERMITIR DELETE
-- ============================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Admins can view all data" ON candidates;
DROP POLICY IF EXISTS "Admins can delete candidates" ON candidates;
DROP POLICY IF EXISTS "Admins can delete assessments" ON assessments;
DROP POLICY IF EXISTS "Admins can delete answers" ON assessment_answers;

-- Criar política para administradores verem todos os dados
CREATE POLICY "Admins can view all candidates" ON candidates
    FOR SELECT USING (true);

-- Criar política para administradores DELETAREM candidatos
CREATE POLICY "Admins can delete candidates" ON candidates
    FOR DELETE USING (true);

-- Criar política para administradores DELETAREM assessments
CREATE POLICY "Admins can delete assessments" ON assessments
    FOR DELETE USING (true);

-- Criar política para administradores DELETAREM respostas
CREATE POLICY "Admins can delete answers" ON assessment_answers
    FOR DELETE USING (true);

-- Criar política para administradores INSERIREM dados
CREATE POLICY "Admins can insert candidates" ON candidates
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can insert assessments" ON assessments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can insert answers" ON assessment_answers
    FOR INSERT WITH CHECK (true);

-- Criar política para administradores ATUALIZAREM dados
CREATE POLICY "Admins can update candidates" ON candidates
    FOR UPDATE USING (true);

CREATE POLICY "Admins can update assessments" ON assessments
    FOR UPDATE USING (true);

-- Verificar políticas criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('candidates', 'assessments', 'assessment_answers')
ORDER BY tablename, policyname;

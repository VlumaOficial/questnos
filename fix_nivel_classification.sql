-- ============================================
-- CORREÇÃO: CLASSIFICAÇÃO DE NÍVEIS BASEADA NA MÉDIA
-- ============================================

-- NOVA REGRA:
-- Média 1.00-1.99 → Nível 1
-- Média 2.00-2.99 → Nível 2  
-- Média 3.00-3.99 → Nível 3
-- Média 4.00-4.99 → Nível 4
-- Média 5.00      → Nível 5

-- 1. CORRIGIR FUNÇÃO DE CÁLCULO PARA ARMAZENAR A MÉDIA
CREATE OR REPLACE FUNCTION calculate_assessment_score(assessment_uuid UUID)
RETURNS TABLE(total_score DECIMAL, percentage_score DECIMAL) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Soma simples das respostas (para referência)
        COALESCE(SUM(aa.answer_score), 0) as total_score,
        -- IMPORTANTE: Agora percentage_score vai armazenar a MÉDIA (não percentual)
        -- Isso facilita a classificação por níveis no frontend
        CASE 
            WHEN COUNT(aa.id) > 0 THEN 
                ROUND(COALESCE(AVG(aa.answer_score), 0), 2)
            ELSE 0 
        END as percentage_score
    FROM assessment_answers aa
    WHERE aa.assessment_id = assessment_uuid;
END;
$$ LANGUAGE plpgsql;

-- 2. RECALCULAR TODOS OS ASSESSMENTS COM A NOVA LÓGICA
DO $$
DECLARE
    assessment_record RECORD;
    score_result RECORD;
BEGIN
    -- Percorrer todos os assessments completos
    FOR assessment_record IN 
        SELECT id FROM assessments WHERE status = 'completed'
    LOOP
        -- Calcular score correto para cada assessment
        SELECT * INTO score_result 
        FROM calculate_assessment_score(assessment_record.id);
        
        -- Atualizar o assessment com os valores corretos
        UPDATE assessments 
        SET 
            total_score = score_result.total_score,
            percentage_score = score_result.percentage_score  -- Agora é a média
        WHERE id = assessment_record.id;
        
        RAISE NOTICE 'Assessment % atualizado: total_score=%, média=% (nível=%)', 
            assessment_record.id, 
            score_result.total_score, 
            score_result.percentage_score,
            CASE 
                WHEN score_result.percentage_score >= 5.0 THEN 5
                WHEN score_result.percentage_score >= 4.0 THEN 4
                WHEN score_result.percentage_score >= 3.0 THEN 3
                WHEN score_result.percentage_score >= 2.0 THEN 2
                ELSE 1
            END;
    END LOOP;
END $$;

-- 3. VERIFICAÇÃO DOS RESULTADOS
SELECT 
    a.id,
    a.total_score,
    a.percentage_score as media_respostas,
    COUNT(aa.id) as total_questions,
    AVG(aa.answer_score) as avg_calculado,
    -- Classificação por nível baseada na média
    CASE 
        WHEN a.percentage_score >= 5.0 THEN 5
        WHEN a.percentage_score >= 4.0 THEN 4
        WHEN a.percentage_score >= 3.0 THEN 3
        WHEN a.percentage_score >= 2.0 THEN 2
        ELSE 1
    END as nivel,
    CASE 
        WHEN a.percentage_score >= 5.0 THEN 'Nível 5 - Especialista'
        WHEN a.percentage_score >= 4.0 THEN 'Nível 4 - Avançado'
        WHEN a.percentage_score >= 3.0 THEN 'Nível 3 - Intermediário'
        WHEN a.percentage_score >= 2.0 THEN 'Nível 2 - Básico'
        ELSE 'Nível 1 - Iniciante'
    END as classificacao
FROM assessments a
LEFT JOIN assessment_answers aa ON a.id = aa.assessment_id
WHERE a.status = 'completed'
GROUP BY a.id, a.total_score, a.percentage_score
ORDER BY a.created_at DESC
LIMIT 10;

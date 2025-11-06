-- ============================================
-- ADICIONAR CAMPOS DE ACEITE DE TERMOS - VERSÃO SIMPLES
-- Execute este script no Supabase SQL Editor
-- ============================================

-- Passo 1: Adicionar colunas
ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false;

ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS privacy_policy_accepted BOOLEAN DEFAULT false;

ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS terms_acceptance_ip INET;

-- Passo 2: Criar índices
CREATE INDEX IF NOT EXISTS idx_candidates_terms_accepted ON candidates(terms_accepted);
CREATE INDEX IF NOT EXISTS idx_candidates_privacy_accepted ON candidates(privacy_policy_accepted);

-- Passo 3: Verificar se funcionou
-- Execute esta query separadamente APÓS executar os comandos acima:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'candidates' AND column_name LIKE '%terms%';

-- ============================================
-- 🎯 EXTENSÕES DO BANCO PARA WHITE-LABEL
-- ============================================
-- 
-- Este script adiciona as tabelas necessárias para o sistema white-label
-- EXECUTE ESTE SCRIPT NO SQL EDITOR DO SUPABASE
--

-- ============================================
-- 1. CONFIGURAÇÕES DE BRANDING
-- ============================================

CREATE TABLE IF NOT EXISTS client_branding (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Identidade Visual
    company_name VARCHAR(255) NOT NULL DEFAULT 'Quest Nós',
    tagline TEXT,
    description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    
    -- Cores da Marca (formato hex)
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#1E40AF',
    accent_color VARCHAR(7) DEFAULT '#06B6D4',
    
    -- Informações de Contato
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_address TEXT,
    contact_website VARCHAR(255),
    
    -- Informações Legais
    legal_company_name VARCHAR(255),
    company_document VARCHAR(50), -- CNPJ
    
    -- Textos Personalizáveis
    hero_title TEXT DEFAULT 'Encontre os melhores talentos',
    hero_subtitle TEXT DEFAULT 'Conectamos você com profissionais qualificados e diversos.',
    
    -- Controle de Funcionalidades (JSON)
    enabled_features JSONB DEFAULT '{
        "questionnaire": true,
        "admin": true,
        "reports": true,
        "personalPresentation": true,
        "aboutPage": true
    }'::jsonb,
    
    -- Metadados
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_client_branding_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER client_branding_updated_at
    BEFORE UPDATE ON client_branding
    FOR EACH ROW
    EXECUTE FUNCTION update_client_branding_updated_at();

-- Inserir configuração padrão
INSERT INTO client_branding (id, company_name) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Quest Nós')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. ESTRUTURA DINÂMICA DE QUESTIONÁRIOS
-- ============================================

-- Tabela de Matérias (Subjects)
CREATE TABLE IF NOT EXISTS dynamic_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Submatérias
CREATE TABLE IF NOT EXISTS dynamic_sub_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID NOT NULL REFERENCES dynamic_subjects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Perguntas
CREATE TABLE IF NOT EXISTS dynamic_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sub_subject_id UUID NOT NULL REFERENCES dynamic_sub_subjects(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'slider', -- slider, multiple_choice, text
    options JSONB, -- Para perguntas de múltipla escolha
    order_index INTEGER NOT NULL DEFAULT 0,
    is_required BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_dynamic_tables_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dynamic_subjects_updated_at
    BEFORE UPDATE ON dynamic_subjects
    FOR EACH ROW
    EXECUTE FUNCTION update_dynamic_tables_updated_at();

CREATE TRIGGER dynamic_sub_subjects_updated_at
    BEFORE UPDATE ON dynamic_sub_subjects
    FOR EACH ROW
    EXECUTE FUNCTION update_dynamic_tables_updated_at();

CREATE TRIGGER dynamic_questions_updated_at
    BEFORE UPDATE ON dynamic_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_dynamic_tables_updated_at();

-- ============================================
-- 3. SISTEMA DE LICENCIAMENTO
-- ============================================

CREATE TABLE IF NOT EXISTS client_licenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Identificação do Cliente
    client_id VARCHAR(100) NOT NULL UNIQUE,
    client_name VARCHAR(255) NOT NULL,
    
    -- Controle de Domínios
    allowed_domains TEXT[] DEFAULT '{}', -- Array de domínios autorizados
    
    -- Controle de Funcionalidades
    licensed_features JSONB DEFAULT '{
        "questionnaire": true,
        "admin": true,
        "reports": true,
        "maxCandidates": 1000,
        "maxAdminUsers": 5
    }'::jsonb,
    
    -- Controle de Validade
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    
    -- Controle de Uso
    usage_stats JSONB DEFAULT '{
        "totalCandidates": 0,
        "totalAssessments": 0,
        "lastActivity": null
    }'::jsonb,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_suspended BOOLEAN DEFAULT false,
    suspension_reason TEXT,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_validation_at TIMESTAMP WITH TIME ZONE
);

-- Trigger para updated_at
CREATE TRIGGER client_licenses_updated_at
    BEFORE UPDATE ON client_licenses
    FOR EACH ROW
    EXECUTE FUNCTION update_dynamic_tables_updated_at();

-- Inserir licença padrão para Quest Nós
INSERT INTO client_licenses (
    client_id, 
    client_name, 
    allowed_domains,
    valid_until
) VALUES (
    'questnos-master',
    'Quest Nós - Master License',
    ARRAY['questnos.com', 'localhost', '127.0.0.1', 'questnos.vercel.app'],
    '2030-12-31 23:59:59+00'
) ON CONFLICT (client_id) DO NOTHING;

-- ============================================
-- 4. LOG DE ATIVIDADES (AUDITORIA)
-- ============================================

CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Identificação
    client_id VARCHAR(100),
    user_id UUID, -- Referência ao admin_users se aplicável
    
    -- Ação
    action VARCHAR(100) NOT NULL, -- 'branding_update', 'question_added', etc.
    resource_type VARCHAR(50), -- 'branding', 'questionnaire', 'license'
    resource_id UUID,
    
    -- Detalhes
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_client_id ON activity_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- ============================================
-- 5. FUNÇÕES UTILITÁRIAS
-- ============================================

-- Função para validar licença
CREATE OR REPLACE FUNCTION validate_client_license(
    p_client_id VARCHAR(100),
    p_domain VARCHAR(255)
)
RETURNS JSONB AS $$
DECLARE
    license_record client_licenses%ROWTYPE;
    result JSONB;
BEGIN
    -- Buscar licença
    SELECT * INTO license_record
    FROM client_licenses
    WHERE client_id = p_client_id;
    
    -- Verificar se existe
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License not found'
        );
    END IF;
    
    -- Verificar se está ativa
    IF NOT license_record.is_active OR license_record.is_suspended THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License inactive or suspended'
        );
    END IF;
    
    -- Verificar validade
    IF license_record.valid_until IS NOT NULL AND license_record.valid_until < NOW() THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License expired'
        );
    END IF;
    
    -- Verificar domínio (se fornecido)
    IF p_domain IS NOT NULL AND NOT (p_domain = ANY(license_record.allowed_domains)) THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'Domain not authorized'
        );
    END IF;
    
    -- Atualizar última validação
    UPDATE client_licenses 
    SET last_validation_at = NOW()
    WHERE client_id = p_client_id;
    
    -- Retornar sucesso
    RETURN jsonb_build_object(
        'valid', true,
        'features', license_record.licensed_features,
        'validUntil', license_record.valid_until
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter configuração de branding
CREATE OR REPLACE FUNCTION get_client_branding()
RETURNS JSONB AS $$
DECLARE
    branding_config JSONB;
BEGIN
    SELECT row_to_json(cb)::jsonb INTO branding_config
    FROM client_branding cb
    WHERE is_active = true
    ORDER BY created_at DESC
    LIMIT 1;
    
    RETURN COALESCE(branding_config, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 6. POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Habilitar RLS nas novas tabelas
ALTER TABLE client_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_sub_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para client_branding (apenas admins podem modificar)
CREATE POLICY "Admins can manage branding" ON client_branding
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Políticas para questionários dinâmicos (apenas admins)
CREATE POLICY "Admins can manage subjects" ON dynamic_subjects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage sub_subjects" ON dynamic_sub_subjects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

CREATE POLICY "Admins can manage questions" ON dynamic_questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Políticas para licenças (apenas leitura para admins)
CREATE POLICY "Admins can view licenses" ON client_licenses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- Políticas para logs (apenas leitura para admins)
CREATE POLICY "Admins can view activity logs" ON activity_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE email = auth.jwt() ->> 'email' 
            AND is_active = true
        )
    );

-- ============================================
-- 7. DADOS INICIAIS DE EXEMPLO
-- ============================================

-- Inserir estrutura de questionário padrão
INSERT INTO dynamic_subjects (id, name, description, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'Liderança', 'Habilidades de liderança e gestão', 1),
('22222222-2222-2222-2222-222222222222', 'Comunicação', 'Habilidades de comunicação e relacionamento', 2),
('33333333-3333-3333-3333-333333333333', 'Técnicas', 'Competências técnicas específicas', 3)
ON CONFLICT (id) DO NOTHING;

-- Inserir submatérias
INSERT INTO dynamic_sub_subjects (id, subject_id, name, order_index) VALUES
('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Gestão de Pessoas', 1),
('aaaa2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Tomada de Decisão', 2),
('bbbb1111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Comunicação Verbal', 1),
('bbbb2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Comunicação Escrita', 2)
ON CONFLICT (id) DO NOTHING;

-- Inserir perguntas de exemplo
INSERT INTO dynamic_questions (sub_subject_id, question_text, order_index) VALUES
('aaaa1111-1111-1111-1111-111111111111', 'Como você motiva sua equipe em momentos difíceis?', 1),
('aaaa1111-1111-1111-1111-111111111111', 'Como você resolve conflitos entre membros da equipe?', 2),
('aaaa2222-2222-2222-2222-222222222222', 'Como você analisa riscos antes de tomar uma decisão importante?', 1),
('bbbb1111-1111-1111-1111-111111111111', 'Como você adapta sua comunicação para diferentes públicos?', 1),
('bbbb2222-2222-2222-2222-222222222222', 'Como você estrutura relatórios e documentos profissionais?', 1);

-- ============================================
-- ✅ SETUP CONCLUÍDO
-- ============================================

-- Verificar se tudo foi criado corretamente
SELECT 
    'client_branding' as table_name,
    COUNT(*) as records
FROM client_branding
UNION ALL
SELECT 
    'dynamic_subjects' as table_name,
    COUNT(*) as records
FROM dynamic_subjects
UNION ALL
SELECT 
    'dynamic_sub_subjects' as table_name,
    COUNT(*) as records
FROM dynamic_sub_subjects
UNION ALL
SELECT 
    'dynamic_questions' as table_name,
    COUNT(*) as records
FROM dynamic_questions
UNION ALL
SELECT 
    'client_licenses' as table_name,
    COUNT(*) as records
FROM client_licenses;

-- Mensagem de sucesso
SELECT '🎉 Setup do banco white-label concluído com sucesso!' as status;

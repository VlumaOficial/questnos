-- ============================================
-- 🔧 AJUSTES NECESSÁRIOS NO BANCO WHITE-LABEL
-- ============================================
-- 
-- Este script corrige problemas identificados na implementação
-- EXECUTE ESTE SCRIPT NO SQL EDITOR DO SUPABASE APÓS O SETUP INICIAL
--

-- ============================================
-- 1. CONFIGURAR SUPABASE STORAGE
-- ============================================

-- Criar bucket para assets (logos, favicons, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'assets',
    'assets',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon']
)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir uploads públicos no bucket assets
CREATE POLICY "Allow public uploads to assets bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Allow public access to assets bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');

CREATE POLICY "Allow public updates to assets bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'assets');

CREATE POLICY "Allow public deletes from assets bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'assets');

-- ============================================
-- 2. CONFIGURAR POLÍTICAS RLS PARA PRODUÇÃO
-- ============================================

-- Políticas baseadas em autenticação real para ambiente produtivo
-- Estas políticas serão usadas tanto em desenvolvimento quanto em produção

-- Política para client_branding - apenas usuários autenticados
DROP POLICY IF EXISTS "Admins can manage branding" ON client_branding;
DROP POLICY IF EXISTS "Allow all operations on branding for development" ON client_branding;
CREATE POLICY "Authenticated users can manage branding" ON client_branding
    FOR ALL USING (auth.role() = 'authenticated');

-- Política para leitura pública de branding (para aplicar configurações)
CREATE POLICY "Public can read active branding" ON client_branding
    FOR SELECT USING (is_active = true);

-- Políticas para questionários dinâmicos - apenas usuários autenticados
DROP POLICY IF EXISTS "Admins can manage subjects" ON dynamic_subjects;
DROP POLICY IF EXISTS "Allow all operations on subjects for development" ON dynamic_subjects;
CREATE POLICY "Authenticated users can manage subjects" ON dynamic_subjects
    FOR ALL USING (auth.role() = 'authenticated');

-- Leitura pública para questionários ativos
CREATE POLICY "Public can read active subjects" ON dynamic_subjects
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage sub_subjects" ON dynamic_sub_subjects;
DROP POLICY IF EXISTS "Allow all operations on sub_subjects for development" ON dynamic_sub_subjects;
CREATE POLICY "Authenticated users can manage sub_subjects" ON dynamic_sub_subjects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read active sub_subjects" ON dynamic_sub_subjects
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage questions" ON dynamic_questions;
DROP POLICY IF EXISTS "Allow all operations on questions for development" ON dynamic_questions;
CREATE POLICY "Authenticated users can manage questions" ON dynamic_questions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read active questions" ON dynamic_questions
    FOR SELECT USING (is_active = true);

-- Políticas para licenças - apenas leitura para usuários autenticados
DROP POLICY IF EXISTS "Admins can view licenses" ON client_licenses;
DROP POLICY IF EXISTS "Allow read access to licenses for development" ON client_licenses;
CREATE POLICY "Authenticated users can view licenses" ON client_licenses
    FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para logs - apenas usuários autenticados
DROP POLICY IF EXISTS "Admins can view activity logs" ON activity_logs;
DROP POLICY IF EXISTS "Allow read access to activity logs for development" ON activity_logs;
DROP POLICY IF EXISTS "Allow insert activity logs for development" ON activity_logs;
CREATE POLICY "Authenticated users can view activity logs" ON activity_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert activity logs" ON activity_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política especial para inserção de logs via service (sem autenticação direta)
CREATE POLICY "Service can insert activity logs" ON activity_logs
    FOR INSERT WITH CHECK (true);

-- ============================================
-- 3. FUNÇÃO DE VALIDAÇÃO DE LICENÇA PARA PRODUÇÃO
-- ============================================

-- Função robusta para validação de licenças em ambiente produtivo
CREATE OR REPLACE FUNCTION validate_client_license(
    p_client_id VARCHAR(100),
    p_domain VARCHAR(255) DEFAULT NULL
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
            'reason', 'License not found',
            'clientId', p_client_id
        );
    END IF;
    
    -- Verificar se está ativa
    IF NOT license_record.is_active THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License inactive',
            'clientId', p_client_id
        );
    END IF;
    
    -- Verificar se está suspensa
    IF license_record.is_suspended THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License suspended',
            'suspensionReason', license_record.suspension_reason,
            'clientId', p_client_id
        );
    END IF;
    
    -- Verificar validade temporal
    IF license_record.valid_until IS NOT NULL AND license_record.valid_until < NOW() THEN
        RETURN jsonb_build_object(
            'valid', false,
            'reason', 'License expired',
            'expiredAt', license_record.valid_until,
            'clientId', p_client_id
        );
    END IF;
    
    -- Verificar domínio autorizado (se fornecido)
    IF p_domain IS NOT NULL THEN
        IF NOT (p_domain = ANY(license_record.allowed_domains)) THEN
            -- Log da tentativa de acesso não autorizado
            INSERT INTO activity_logs (
                action,
                resource_type,
                details
            ) VALUES (
                'unauthorized_domain_access',
                'license',
                jsonb_build_object(
                    'clientId', p_client_id,
                    'attemptedDomain', p_domain,
                    'allowedDomains', license_record.allowed_domains
                )
            );
            
            RETURN jsonb_build_object(
                'valid', false,
                'reason', 'Domain not authorized',
                'domain', p_domain,
                'clientId', p_client_id
            );
        END IF;
    END IF;
    
    -- Atualizar estatísticas de uso
    UPDATE client_licenses 
    SET 
        last_validation_at = NOW(),
        usage_stats = jsonb_set(
            usage_stats,
            '{lastActivity}',
            to_jsonb(NOW()::text)
        )
    WHERE client_id = p_client_id;
    
    -- Log de acesso autorizado
    INSERT INTO activity_logs (
        action,
        resource_type,
        details
    ) VALUES (
        'license_validated',
        'license',
        jsonb_build_object(
            'clientId', p_client_id,
            'domain', p_domain,
            'validUntil', license_record.valid_until
        )
    );
    
    -- Retornar sucesso com informações completas
    RETURN jsonb_build_object(
        'valid', true,
        'clientId', p_client_id,
        'clientName', license_record.client_name,
        'features', license_record.licensed_features,
        'validUntil', license_record.valid_until,
        'allowedDomains', license_record.allowed_domains,
        'usage', license_record.usage_stats
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. FUNÇÃO PARA OBTER CONFIGURAÇÃO DE BRANDING
-- ============================================

-- Versão simplificada sem dependência de autenticação
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
    
    -- Se não houver configuração, criar uma padrão
    IF branding_config IS NULL THEN
        INSERT INTO client_branding (
            company_name,
            tagline,
            description,
            primary_color,
            secondary_color,
            accent_color,
            hero_title,
            hero_subtitle,
            enabled_features
        ) VALUES (
            'Quest Nós',
            'Recrutamento com Diversidade e Inclusão',
            'Conectamos talentos diversos com oportunidades únicas no mercado de trabalho.',
            '#3B82F6',
            '#1E40AF',
            '#06B6D4',
            'Encontre os melhores talentos',
            'Conectamos você com profissionais qualificados e diversos.',
            '{
                "questionnaire": true,
                "admin": true,
                "reports": true,
                "personalPresentation": true,
                "aboutPage": true
            }'::jsonb
        ) RETURNING row_to_json(client_branding)::jsonb INTO branding_config;
    END IF;
    
    RETURN COALESCE(branding_config, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. INSERIR DADOS INICIAIS PARA PRODUÇÃO
-- ============================================

-- Inserir configuração inicial de branding
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM client_branding WHERE is_active = true) THEN
        INSERT INTO client_branding (
            id,
            company_name,
            tagline,
            description,
            primary_color,
            secondary_color,
            accent_color,
            hero_title,
            hero_subtitle,
            enabled_features
        ) VALUES (
            '00000000-0000-0000-0000-000000000001',
            'Quest Nós',
            'Recrutamento com Diversidade e Inclusão',
            'Conectamos talentos diversos com oportunidades únicas no mercado de trabalho.',
            '#3B82F6',
            '#1E40AF',
            '#06B6D4',
            'Encontre os melhores talentos',
            'Conectamos você com profissionais qualificados e diversos.',
            '{
                "questionnaire": true,
                "admin": true,
                "reports": true,
                "personalPresentation": true,
                "aboutPage": true
            }'::jsonb
        );
    END IF;
END $$;

-- Inserir licença master para produção
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM client_licenses WHERE client_id = 'questnos-master') THEN
        INSERT INTO client_licenses (
            client_id,
            client_name,
            allowed_domains,
            licensed_features,
            valid_from,
            valid_until,
            usage_stats,
            is_active
        ) VALUES (
            'questnos-master',
            'Quest Nós - Licença Master',
            ARRAY[
                'questnos.com',
                'www.questnos.com',
                'questnos.vercel.app',
                'localhost',
                '127.0.0.1',
                '0.0.0.0'
            ],
            '{
                "questionnaire": true,
                "admin": true,
                "reports": true,
                "personalPresentation": true,
                "aboutPage": true,
                "maxCandidates": 10000,
                "maxAdminUsers": 50
            }'::jsonb,
            NOW(),
            '2030-12-31 23:59:59+00',
            '{
                "totalCandidates": 0,
                "totalAssessments": 0,
                "lastActivity": null
            }'::jsonb,
            true
        );
    END IF;
END $$;

-- Verificar se já existe estrutura de questionário
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM dynamic_subjects) THEN
        -- Inserir estrutura de questionário padrão
        INSERT INTO dynamic_subjects (id, name, description, order_index) VALUES
        ('11111111-1111-1111-1111-111111111111', 'Liderança', 'Habilidades de liderança e gestão', 1),
        ('22222222-2222-2222-2222-222222222222', 'Comunicação', 'Habilidades de comunicação e relacionamento', 2),
        ('33333333-3333-3333-3333-333333333333', 'Técnicas', 'Competências técnicas específicas', 3);

        -- Inserir submatérias
        INSERT INTO dynamic_sub_subjects (id, subject_id, name, order_index) VALUES
        ('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Gestão de Pessoas', 1),
        ('aaaa2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Tomada de Decisão', 2),
        ('bbbb1111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Comunicação Verbal', 1),
        ('bbbb2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Comunicação Escrita', 2);

        -- Inserir perguntas de exemplo
        INSERT INTO dynamic_questions (sub_subject_id, question_text, order_index) VALUES
        ('aaaa1111-1111-1111-1111-111111111111', 'Como você motiva sua equipe em momentos difíceis?', 1),
        ('aaaa1111-1111-1111-1111-111111111111', 'Como você resolve conflitos entre membros da equipe?', 2),
        ('aaaa2222-2222-2222-2222-222222222222', 'Como você analisa riscos antes de tomar uma decisão importante?', 1),
        ('bbbb1111-1111-1111-1111-111111111111', 'Como você adapta sua comunicação para diferentes públicos?', 1),
        ('bbbb2222-2222-2222-2222-222222222222', 'Como você estrutura relatórios e documentos profissionais?', 1);
    END IF;
END $$;

-- ============================================
-- 6. VERIFICAÇÕES FINAIS
-- ============================================

-- Verificar se tudo foi criado corretamente
SELECT 
    'client_branding' as table_name,
    COUNT(*) as records,
    'Configurações de branding' as description
FROM client_branding
UNION ALL
SELECT 
    'dynamic_subjects' as table_name,
    COUNT(*) as records,
    'Matérias do questionário' as description
FROM dynamic_subjects
UNION ALL
SELECT 
    'dynamic_sub_subjects' as table_name,
    COUNT(*) as records,
    'Submatérias do questionário' as description
FROM dynamic_sub_subjects
UNION ALL
SELECT 
    'dynamic_questions' as table_name,
    COUNT(*) as records,
    'Perguntas do questionário' as description
FROM dynamic_questions
UNION ALL
SELECT 
    'client_licenses' as table_name,
    COUNT(*) as records,
    'Licenças de cliente' as description
FROM client_licenses
UNION ALL
SELECT 
    'storage.buckets' as table_name,
    COUNT(*) as records,
    'Buckets de storage' as description
FROM storage.buckets
WHERE id = 'assets';

-- Testar função de validação de licença
SELECT validate_client_license('questnos-master', 'localhost') as license_test;

-- Testar função de branding
SELECT get_client_branding() as branding_test;

-- ============================================
-- 7. CONFIGURAÇÃO DE AUTENTICAÇÃO NECESSÁRIA
-- ============================================

-- IMPORTANTE: Para que as políticas RLS funcionem, você precisa:
-- 1. Configurar autenticação no Supabase (Auth > Settings)
-- 2. Habilitar provedores de login (email/senha, Google, etc.)
-- 3. Criar usuários admin via Supabase Auth
-- 4. Usar supabase.auth.signIn() no frontend

-- Exemplo de como criar usuário admin via SQL (opcional):
-- INSERT INTO auth.users (
--     instance_id,
--     id,
--     aud,
--     role,
--     email,
--     encrypted_password,
--     email_confirmed_at,
--     created_at,
--     updated_at
-- ) VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     gen_random_uuid(),
--     'authenticated',
--     'authenticated',
--     'admin@questnos.com',
--     crypt('senha123', gen_salt('bf')),
--     NOW(),
--     NOW(),
--     NOW()
-- );

-- Mensagem de sucesso
SELECT '🎉 Banco white-label configurado para PRODUÇÃO!' as status,
       'Políticas RLS ativas - Configure autenticação no Supabase' as next_step,
       'Licença master criada para questnos-master' as license_info;

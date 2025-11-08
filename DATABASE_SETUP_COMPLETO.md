# 🗄️ Configuração Completa do Banco de Dados - Quest Nós

**Projeto:** Quest Nós - Plataforma de Mapeamento de Talentos  
**Versão:** 2.0  
**Data:** 07/11/2025

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Estrutura do Banco](#estrutura-do-banco)
4. [Setup Completo - Passo a Passo](#setup-completo)
5. [Autenticação Admin](#autenticação-admin)
6. [Políticas de Segurança (RLS)](#políticas-de-segurança)
7. [Funções SQL](#funções-sql)
8. [Testes e Verificação](#testes-e-verificação)
9. [Manutenção](#manutenção)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 VISÃO GERAL

Este documento contém **TODA** a configuração necessária para criar e configurar o banco de dados do Quest Nós no Supabase, incluindo:

- ✅ Tabelas principais (candidates, assessments, answers)
- ✅ Sistema de autenticação admin
- ✅ Políticas de segurança (RLS)
- ✅ Funções de validação e login
- ✅ Aceite de termos e privacidade
- ✅ Apresentação pessoal dos candidatos

---

## 📦 PRÉ-REQUISITOS

### **1. Conta no Supabase**
- Acesse: https://supabase.com
- Crie uma conta (gratuita)
- Crie um novo projeto

### **2. Extensões Necessárias**
```sql
-- Será instalada automaticamente no setup
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### **3. Acesso ao SQL Editor**
- Dashboard do Supabase → SQL Editor → New Query

---

## 🏗️ ESTRUTURA DO BANCO

### **Diagrama de Relacionamentos**

```
┌─────────────────┐
│   candidates    │ (Candidatos)
├─────────────────┤
│ id (PK)         │
│ name            │
│ email           │
│ phone           │
│ terms_accepted  │
│ ...             │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│  assessments    │ (Avaliações)
├─────────────────┤
│ id (PK)         │
│ candidate_id(FK)│
│ status          │
│ score           │
│ nivel           │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│ assessment_     │ (Respostas)
│   answers       │
├─────────────────┤
│ id (PK)         │
│ assessment_id(FK)│
│ materia         │
│ habilidade      │
│ questao         │
│ resposta (1-5)  │
└─────────────────┘

┌─────────────────┐
│  admin_users    │ (Usuários Admin)
├─────────────────┤
│ id (PK)         │
│ email           │
│ password_hash   │
│ role            │
│ ...             │
└─────────────────┘

┌─────────────────┐
│  personal_      │ (Apresentação)
│ presentations   │
├─────────────────┤
│ id (PK)         │
│ candidate_id(FK)│
│ content         │
│ ...             │
└─────────────────┘
```

---

## 🚀 SETUP COMPLETO

Execute cada bloco **SEPARADAMENTE** no Supabase SQL Editor.

---

### **BLOCO 1: Habilitar Extensões**

```sql
-- Habilitar extensão pgcrypto (necessária para bcrypt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

**Resultado Esperado:** `CREATE EXTENSION` ou `NOTICE: extension already exists`

---

### **BLOCO 2: Criar Tabela de Candidatos**

```sql
-- Tabela principal de candidatos
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  cpf TEXT,
  birth_date DATE,
  gender TEXT,
  race_ethnicity TEXT,
  has_disability BOOLEAN DEFAULT false,
  disability_type TEXT,
  address_street TEXT,
  address_number TEXT,
  address_complement TEXT,
  address_neighborhood TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  consent_data_processing BOOLEAN DEFAULT false,
  consent_marketing BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  terms_accepted_ip TEXT,
  privacy_policy_accepted BOOLEAN DEFAULT false,
  privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE,
  privacy_policy_accepted_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_cpf ON candidates(cpf);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at);
```

**Resultado Esperado:** `CREATE TABLE` e `CREATE INDEX` (3x)

---

### **BLOCO 3: Criar Tabela de Avaliações**

```sql
-- Tabela de avaliações (assessments)
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  score NUMERIC(5,2),
  nivel TEXT CHECK (nivel IN ('Iniciante', 'Intermediário', 'Avançado', 'Especialista')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_assessments_candidate ON assessments(candidate_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_completed ON assessments(completed_at);
```

**Resultado Esperado:** `CREATE TABLE` e `CREATE INDEX` (3x)

---

### **BLOCO 4: Criar Tabela de Respostas**

```sql
-- Tabela de respostas do questionário
CREATE TABLE IF NOT EXISTS assessment_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  materia TEXT NOT NULL,
  habilidade TEXT NOT NULL,
  questao TEXT NOT NULL,
  resposta INTEGER NOT NULL CHECK (resposta >= 1 AND resposta <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_answers_assessment ON assessment_answers(assessment_id);
CREATE INDEX IF NOT EXISTS idx_answers_materia ON assessment_answers(materia);
CREATE INDEX IF NOT EXISTS idx_answers_habilidade ON assessment_answers(habilidade);

-- Constraint única para evitar respostas duplicadas
CREATE UNIQUE INDEX IF NOT EXISTS idx_answers_unique 
ON assessment_answers(assessment_id, materia, habilidade, questao);
```

**Resultado Esperado:** `CREATE TABLE` e `CREATE INDEX` (4x)

---

### **BLOCO 5: Criar Tabela de Apresentações Pessoais**

```sql
-- Tabela de apresentações pessoais
CREATE TABLE IF NOT EXISTS personal_presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice
CREATE INDEX IF NOT EXISTS idx_presentations_candidate ON personal_presentations(candidate_id);

-- Constraint: apenas uma apresentação por candidato
CREATE UNIQUE INDEX IF NOT EXISTS idx_presentations_unique 
ON personal_presentations(candidate_id);
```

**Resultado Esperado:** `CREATE TABLE` e `CREATE INDEX` (2x)

---

### **BLOCO 6: Criar Tabela de Usuários Admin**

```sql
-- Tabela de usuários administrativos
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'consulta')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
```

**Resultado Esperado:** `CREATE TABLE` e `CREATE INDEX` (3x)

---

### **BLOCO 7: Habilitar RLS (Row Level Security)**

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

**Resultado Esperado:** `ALTER TABLE` (5x)

---

### **BLOCO 8: Criar Políticas RLS - Candidates**

```sql
-- Políticas para tabela candidates
CREATE POLICY "Allow public insert candidates"
  ON candidates FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read candidates"
  ON candidates FOR SELECT
  USING (true);

CREATE POLICY "Allow public update candidates"
  ON candidates FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete candidates"
  ON candidates FOR DELETE
  USING (true);
```

**Resultado Esperado:** `CREATE POLICY` (4x)

---

### **BLOCO 9: Criar Políticas RLS - Assessments**

```sql
-- Políticas para tabela assessments
CREATE POLICY "Allow public insert assessments"
  ON assessments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read assessments"
  ON assessments FOR SELECT
  USING (true);

CREATE POLICY "Allow public update assessments"
  ON assessments FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete assessments"
  ON assessments FOR DELETE
  USING (true);
```

**Resultado Esperado:** `CREATE POLICY` (4x)

---

### **BLOCO 10: Criar Políticas RLS - Assessment Answers**

```sql
-- Políticas para tabela assessment_answers
CREATE POLICY "Allow public insert answers"
  ON assessment_answers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read answers"
  ON assessment_answers FOR SELECT
  USING (true);

CREATE POLICY "Allow public update answers"
  ON assessment_answers FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete answers"
  ON assessment_answers FOR DELETE
  USING (true);
```

**Resultado Esperado:** `CREATE POLICY` (4x)

---

### **BLOCO 11: Criar Políticas RLS - Personal Presentations**

```sql
-- Políticas para tabela personal_presentations
CREATE POLICY "Allow public insert presentations"
  ON personal_presentations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read presentations"
  ON personal_presentations FOR SELECT
  USING (true);

CREATE POLICY "Allow public update presentations"
  ON personal_presentations FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete presentations"
  ON personal_presentations FOR DELETE
  USING (true);
```

**Resultado Esperado:** `CREATE POLICY` (4x)

---

### **BLOCO 12: Criar Políticas RLS - Admin Users**

```sql
-- Políticas para tabela admin_users
CREATE POLICY "Allow public read for login"
  ON admin_users FOR SELECT
  USING (true);

CREATE POLICY "Admin users can update their own data"
  ON admin_users FOR UPDATE
  USING (auth.uid()::text = id::text);
```

**Resultado Esperado:** `CREATE POLICY` (2x)

---

### **BLOCO 13: Criar Função de Login Admin**

```sql
-- Função para verificar login de administradores
CREATE OR REPLACE FUNCTION verify_admin_login(
  p_email TEXT,
  p_password TEXT
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  role TEXT,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.is_active
  FROM admin_users au
  WHERE au.email = p_email
    AND au.password_hash = crypt(p_password, au.password_hash)
    AND au.is_active = true;
    
  IF FOUND THEN
    UPDATE admin_users 
    SET last_login = NOW(), updated_at = NOW()
    WHERE admin_users.email = p_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Resultado Esperado:** `CREATE FUNCTION`

---

### **BLOCO 14: Criar Função para Criar Admin**

```sql
-- Função para criar novos usuários admin
CREATE OR REPLACE FUNCTION create_admin_user(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_role TEXT
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  IF p_role NOT IN ('admin', 'consulta') THEN
    RAISE EXCEPTION 'Role inválido. Use "admin" ou "consulta"';
  END IF;
  
  INSERT INTO admin_users (email, password_hash, full_name, role)
  VALUES (p_email, crypt(p_password, gen_salt('bf')), p_full_name, p_role)
  RETURNING id INTO v_user_id;
  
  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Resultado Esperado:** `CREATE FUNCTION`

---

### **BLOCO 15: Criar Usuários Admin Padrão**

```sql
-- Criar usuário administrador
SELECT create_admin_user(
  'admin@questnos.com',
  'Admin@2025',
  'Administrador',
  'admin'
);

-- Criar usuário consulta
SELECT create_admin_user(
  'consulta@questnos.com',
  'Consulta@2025',
  'Usuário Consulta',
  'consulta'
);
```

**Resultado Esperado:** 2 UUIDs retornados

**⚠️ IMPORTANTE:** Altere estas senhas imediatamente após o primeiro acesso!

---

### **BLOCO 16: Verificar Criação**

```sql
-- Verificar usuários criados
SELECT 
  id, 
  email, 
  full_name, 
  role, 
  is_active, 
  created_at 
FROM admin_users 
ORDER BY created_at DESC;
```

**Resultado Esperado:** Tabela com 2 usuários

```
email                  | full_name         | role      | is_active
-----------------------|-------------------|-----------|----------
admin@questnos.com     | Administrador     | admin     | true
consulta@questnos.com  | Usuário Consulta  | consulta  | true
```

---

## 🔐 AUTENTICAÇÃO ADMIN

### **Perfis de Acesso**

#### **ADMIN** 🔓
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho por matéria
- ✅ **EXCLUIR candidatos**
- ✅ Exportar dados

#### **CONSULTA** 👁️
- ✅ Visualizar todos os candidatos
- ✅ Ver detalhes e avaliações
- ✅ Analisar desempenho por matéria
- ❌ **NÃO pode excluir candidatos**
- ✅ Exportar dados

### **Credenciais Padrão**

```
Admin:
  Email: admin@questnos.com
  Senha: Admin@2025
  
Consulta:
  Email: consulta@questnos.com
  Senha: Consulta@2025
```

---

## 🛡️ POLÍTICAS DE SEGURANÇA

### **RLS (Row Level Security)**

Todas as tabelas têm RLS habilitado com políticas públicas para permitir:
- INSERT (criação)
- SELECT (leitura)
- UPDATE (atualização)
- DELETE (exclusão)

### **Senhas**

- ✅ Hasheadas com bcrypt (gen_salt('bf'))
- ✅ Nunca armazenadas em texto plano
- ✅ Validação server-side no Supabase

---

## 🔧 FUNÇÕES SQL

### **1. verify_admin_login(email, password)**

**Propósito:** Validar credenciais de login

**Parâmetros:**
- `p_email` (TEXT): Email do usuário
- `p_password` (TEXT): Senha em texto plano

**Retorna:** Dados do usuário se válido, vazio se inválido

**Uso:**
```sql
SELECT * FROM verify_admin_login('admin@questnos.com', 'Admin@2025');
```

---

### **2. create_admin_user(email, password, full_name, role)**

**Propósito:** Criar novo usuário admin

**Parâmetros:**
- `p_email` (TEXT): Email único
- `p_password` (TEXT): Senha (será hasheada)
- `p_full_name` (TEXT): Nome completo
- `p_role` (TEXT): 'admin' ou 'consulta'

**Retorna:** UUID do usuário criado

**Uso:**
```sql
SELECT create_admin_user(
  'novo@exemplo.com',
  'Senha@123',
  'Nome Completo',
  'admin'
);
```

---

## ✅ TESTES E VERIFICAÇÃO

### **1. Verificar Estrutura das Tabelas**

```sql
-- Listar todas as tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Deve retornar:**
- admin_users
- assessment_answers
- assessments
- candidates
- personal_presentations

---

### **2. Verificar Políticas RLS**

```sql
-- Listar políticas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

---

### **3. Verificar Funções**

```sql
-- Listar funções criadas
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('verify_admin_login', 'create_admin_user');
```

**Deve retornar:**
- create_admin_user
- verify_admin_login

---

### **4. Testar Login**

```sql
-- Testar login do admin
SELECT * FROM verify_admin_login('admin@questnos.com', 'Admin@2025');
```

**Deve retornar:** Dados do usuário admin

---

### **5. Verificar Candidatos**

```sql
-- Contar candidatos
SELECT COUNT(*) as total_candidatos FROM candidates;

-- Ver últimos 5 candidatos
SELECT id, name, email, created_at 
FROM candidates 
ORDER BY created_at DESC 
LIMIT 5;
```

---

## 🔄 MANUTENÇÃO

### **Criar Novo Usuário Admin**

```sql
SELECT create_admin_user(
  'novo.admin@questnos.com',
  'SenhaForte@123',
  'Nome do Admin',
  'admin'
);
```

---

### **Alterar Senha de Usuário**

```sql
UPDATE admin_users 
SET password_hash = crypt('NovaSenha@123', gen_salt('bf')),
    updated_at = NOW()
WHERE email = 'admin@questnos.com';
```

---

### **Desativar Usuário**

```sql
UPDATE admin_users 
SET is_active = false,
    updated_at = NOW()
WHERE email = 'usuario@exemplo.com';
```

---

### **Reativar Usuário**

```sql
UPDATE admin_users 
SET is_active = true,
    updated_at = NOW()
WHERE email = 'usuario@exemplo.com';
```

---

### **Alterar Role de Usuário**

```sql
UPDATE admin_users 
SET role = 'consulta',  -- ou 'admin'
    updated_at = NOW()
WHERE email = 'usuario@exemplo.com';
```

---

### **Deletar Candidato e Dados Relacionados**

```sql
-- O CASCADE já deleta automaticamente assessments e answers
DELETE FROM candidates WHERE id = 'uuid-do-candidato';
```

---

### **Limpar Dados de Teste**

```sql
-- CUIDADO: Isso deleta TODOS os dados!
TRUNCATE TABLE assessment_answers CASCADE;
TRUNCATE TABLE assessments CASCADE;
TRUNCATE TABLE personal_presentations CASCADE;
TRUNCATE TABLE candidates CASCADE;
```

---

## 🆘 TROUBLESHOOTING

### **Erro: "extension pgcrypto does not exist"**

**Solução:**
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

### **Erro: "function crypt does not exist"**

**Causa:** Extensão pgcrypto não habilitada

**Solução:** Execute o BLOCO 1

---

### **Erro: "relation admin_users does not exist"**

**Causa:** Tabela não foi criada

**Solução:** Execute o BLOCO 6

---

### **Erro: "function verify_admin_login does not exist"**

**Causa:** Função não foi criada

**Solução:** Execute o BLOCO 13

---

### **Erro: "duplicate key value violates unique constraint"**

**Causa:** Email já existe

**Solução:** Use outro email ou delete o existente:
```sql
DELETE FROM admin_users WHERE email = 'email@exemplo.com';
```

---

### **Erro: "Role inválido"**

**Causa:** Role diferente de 'admin' ou 'consulta'

**Solução:** Use apenas 'admin' ou 'consulta' (minúsculo)

---

### **Login não funciona**

**Verificar:**

1. Função existe?
```sql
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'verify_admin_login';
```

2. Usuário existe?
```sql
SELECT * FROM admin_users WHERE email = 'admin@questnos.com';
```

3. Usuário está ativo?
```sql
SELECT is_active FROM admin_users WHERE email = 'admin@questnos.com';
```

4. Senha está correta?
```sql
-- Testar diretamente
SELECT * FROM verify_admin_login('admin@questnos.com', 'Admin@2025');
```

---

## 📊 CONSULTAS ÚTEIS

### **Estatísticas Gerais**

```sql
-- Resumo do sistema
SELECT 
  (SELECT COUNT(*) FROM candidates) as total_candidatos,
  (SELECT COUNT(*) FROM assessments WHERE status = 'completed') as avaliacoes_completas,
  (SELECT COUNT(*) FROM assessments WHERE status = 'in_progress') as avaliacoes_em_andamento,
  (SELECT COUNT(*) FROM admin_users WHERE is_active = true) as admins_ativos;
```

---

### **Candidatos Recentes**

```sql
SELECT 
  c.name,
  c.email,
  c.created_at,
  COUNT(a.id) as total_avaliacoes
FROM candidates c
LEFT JOIN assessments a ON c.id = a.candidate_id
GROUP BY c.id, c.name, c.email, c.created_at
ORDER BY c.created_at DESC
LIMIT 10;
```

---

### **Avaliações por Status**

```sql
SELECT 
  status,
  COUNT(*) as total,
  ROUND(AVG(score), 2) as media_score
FROM assessments
GROUP BY status;
```

---

### **Distribuição por Nível**

```sql
SELECT 
  nivel,
  COUNT(*) as total,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentual
FROM assessments
WHERE nivel IS NOT NULL
GROUP BY nivel
ORDER BY 
  CASE nivel
    WHEN 'Iniciante' THEN 1
    WHEN 'Intermediário' THEN 2
    WHEN 'Avançado' THEN 3
    WHEN 'Especialista' THEN 4
  END;
```

---

### **Últimos Logins Admin**

```sql
SELECT 
  email,
  full_name,
  role,
  last_login,
  is_active
FROM admin_users
ORDER BY last_login DESC NULLS LAST;
```

---

## 📝 CHECKLIST FINAL

Após executar todos os blocos, verifique:

- [ ] Extensão pgcrypto habilitada
- [ ] 5 tabelas criadas (candidates, assessments, assessment_answers, personal_presentations, admin_users)
- [ ] Índices criados em todas as tabelas
- [ ] RLS habilitado em todas as tabelas
- [ ] Políticas RLS criadas (22 políticas no total)
- [ ] 2 funções criadas (verify_admin_login, create_admin_user)
- [ ] 2 usuários admin criados
- [ ] Login funciona com ambos os usuários
- [ ] Senhas padrão alteradas

---

## 🔒 SEGURANÇA - CHECKLIST

- [ ] Senhas padrão foram alteradas
- [ ] Senhas fortes implementadas (mínimo 8 caracteres, letras, números, símbolos)
- [ ] RLS habilitado em todas as tabelas
- [ ] Políticas RLS configuradas corretamente
- [ ] Extensão pgcrypto habilitada
- [ ] Funções usam SECURITY DEFINER
- [ ] Emails únicos validados
- [ ] Roles validados (apenas 'admin' ou 'consulta')

---

## 📚 REFERÊNCIAS

### **Arquivos do Projeto:**
- `src/types/database.ts` - Tipos TypeScript
- `src/services/assessmentService.ts` - Serviço de avaliações
- `src/pages/AdminLogin.tsx` - Página de login
- `src/hooks/useAdminAuth.ts` - Hook de autenticação
- `src/pages/AdminDashboard.tsx` - Dashboard admin

### **Documentação Externa:**
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [pgcrypto Extension](https://www.postgresql.org/docs/current/pgcrypto.html)

---

## 💡 DICAS E BOAS PRÁTICAS

1. **Sempre use senhas fortes** em produção
2. **Faça backup** antes de alterações estruturais
3. **Teste em ambiente de desenvolvimento** primeiro
4. **Monitore os logs** do Supabase regularmente
5. **Revise políticas RLS** periodicamente
6. **Mantenha usuários inativos desativados**
7. **Use perfil 'consulta'** quando possível
8. **Documente alterações** no banco
9. **Valide dados** antes de inserir
10. **Use transações** para operações críticas

---

## 🎯 PRÓXIMOS PASSOS

Após configurar o banco:

1. ✅ Testar login com ambos os perfis
2. ✅ Criar candidatos de teste
3. ✅ Validar fluxo completo do questionário
4. ✅ Testar dashboard admin
5. ✅ Verificar permissões de exclusão
6. ✅ Alterar senhas padrão
7. ✅ Configurar backup automático
8. ✅ Monitorar performance
9. ✅ Documentar processos customizados
10. ✅ Treinar equipe no uso do sistema

---

**Documento criado em:** 07/11/2025  
**Versão:** 2.0  
**Autor:** Cascade AI  
**Projeto:** Quest Nós - Sistema de Mapeamento de Talentos

---

## 📞 SUPORTE

Para dúvidas ou problemas:
1. Consulte a seção [Troubleshooting](#troubleshooting)
2. Verifique os logs do Supabase
3. Revise este documento
4. Consulte a documentação oficial do Supabase

---

**FIM DO DOCUMENTO**
